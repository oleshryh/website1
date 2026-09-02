import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { basename, join } from 'node:path'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'

// node scripts/process-video.mjs [video] [outDir] [--canvas WxH] [--step N] [--width N]
// The canvas override exists so a second clip can be keyed onto the *first*
// clip's canvas geometry. Both sets then render at identical dimensions, and a
// sequence can hand over to the next one mid-scroll without the figure
// changing size. Left to itself each clip sizes its canvas to its own widest
// pose, which differs between takes.
const [, , videoArg, outDirArg, ...flags] = process.argv
const VIDEO = videoArg ?? 'media/video1.mp4'
const OUT_DIR = outDirArg ?? 'public/frames'
const RAW_DIR = join('.frame-cache', `raw-${basename(OUT_DIR)}`)

const flagValue = (name) => {
  const at = flags.indexOf(name)
  return at === -1 ? null : flags[at + 1]
}

// Keep every Nth frame — the lighter sets small screens load.
const STEP = Number(flagValue('--step') ?? 1)

const canvasFlag = flags.indexOf('--canvas')
const CANVAS_OVERRIDE =
  canvasFlag === -1
    ? null
    : (() => {
        const match = /^(\d+)x(\d+)$/.exec(flags[canvasFlag + 1] ?? '')
        if (!match) throw new Error('--canvas expects WxH, e.g. --canvas 765x472')
        return { width: Number(match[1]), height: Number(match[2]) }
      })()
const OUT_WIDTH = Number(flagValue('--width') ?? 800)
// Pixels at/above this "whiteness" are fully transparent; below WHITE_FLOOR fully opaque; feathered in between.
const WHITE_CEIL = 232
const WHITE_FLOOR = 188
// Fraction of the widest/tallest frame added back as breathing room around the canvas.
const CANVAS_PADDING = 0.04

// Validate before destroying: the out dir is wiped below, so a mistyped or
// mis-split argument list would otherwise take the existing frames with it.
if (!existsSync(VIDEO)) throw new Error(`No such video: ${VIDEO}`)
if (!Number.isInteger(STEP) || STEP < 1) throw new Error(`--step expects a positive integer, got ${STEP}`)
if (!Number.isInteger(OUT_WIDTH) || OUT_WIDTH < 1) throw new Error(`--width expects a positive integer, got ${OUT_WIDTH}`)

rmSync(RAW_DIR, { recursive: true, force: true })
rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(RAW_DIR, { recursive: true })
mkdirSync(OUT_DIR, { recursive: true })

// passthrough keeps the clip's own frames. Resampling to a round number
// instead (fps=20 off 24fps footage) drops frames on an uneven cadence, and the
// scrubbed animation inherits that unevenness as judder.
execFileSync(ffmpegPath, ['-y', '-i', VIDEO, '-fps_mode', 'passthrough', join(RAW_DIR, 'frame-%03d.png')], { stdio: 'inherit' })

const extracted = readdirSync(RAW_DIR).filter((f) => f.endsWith('.png')).sort()
const files = extracted.filter((_, i) => i % STEP === 0)
console.log(
  `Extracted ${extracted.length} raw frames, keeping ${files.length}${STEP > 1 ? ` (every ${STEP})` : ''}, keying out white...`,
)

const buffers = []
const perFrameBounds = []

for (const file of files) {
  const { data, info } = await sharp(join(RAW_DIR, file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  let left = width
  let top = height
  let right = 0
  let bottom = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const whiteness = Math.min(r, g, b)
      let alpha
      if (whiteness >= WHITE_CEIL) alpha = 0
      else if (whiteness <= WHITE_FLOOR) alpha = 255
      else alpha = Math.round(255 * (1 - (whiteness - WHITE_FLOOR) / (WHITE_CEIL - WHITE_FLOOR)))
      data[idx + 3] = alpha

      if (alpha > 10) {
        if (x < left) left = x
        if (x > right) right = x
        if (y < top) top = y
        if (y > bottom) bottom = y
      }
    }
  }

  perFrameBounds.push({ left, top, width: right - left + 1, height: bottom - top + 1 })
  buffers.push({ data, width, height, channels })
}

// Stabilize: every frame gets re-centered (horizontally) and floor-aligned
// (vertically) onto a shared canvas sized for the widest/tallest pose, so the
// figure holds still in frame instead of drifting as the pose changes width.
const maxBboxW = Math.max(...perFrameBounds.map((b) => b.width))
const maxBboxH = Math.max(...perFrameBounds.map((b) => b.height))
const padX = Math.round(maxBboxW * CANVAS_PADDING)
const padTop = Math.round(maxBboxH * CANVAS_PADDING)
// No bottom padding: the tallest pose's feet sit exactly on the canvas floor
// so the rendered frame never has a transparent gap under the boots.
const canvasW = CANVAS_OVERRIDE?.width ?? maxBboxW + padX * 2
const canvasH = CANVAS_OVERRIDE?.height ?? maxBboxH + padTop

if (canvasW < maxBboxW || canvasH < maxBboxH) {
  throw new Error(`Canvas ${canvasW}x${canvasH} is smaller than the widest pose ${maxBboxW}x${maxBboxH}`)
}

console.log(
  `Stabilized canvas: ${canvasW}x${canvasH}${CANVAS_OVERRIDE ? ' (override)' : ''} (widest pose ${maxBboxW}x${maxBboxH})`,
)

for (const [i, buf] of buffers.entries()) {
  const b = perFrameBounds[i]
  const cropped = await sharp(buf.data, { raw: { width: buf.width, height: buf.height, channels: buf.channels } })
    .extract({ left: b.left, top: b.top, width: b.width, height: b.height })
    .raw()
    .toBuffer()

  const offsetX = Math.round((canvasW - b.width) / 2)
  const offsetY = canvasH - b.height

  const outHeight = Math.round((canvasH * OUT_WIDTH) / canvasW)
  const outName = `frame-${String(i).padStart(3, '0')}.webp`

  // Composite and resize must run as two separate sharp pipelines: chaining
  // .resize() directly after .composite() on a `create`d canvas silently
  // leaves a transparent strip at the bottom (a sharp quirk), even though
  // doing the same two steps through an intermediate buffer does not.
  const composited = await sharp({
    create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: cropped, raw: { width: b.width, height: b.height, channels: 4 }, left: offsetX, top: offsetY }])
    .raw()
    .toBuffer()

  await sharp(composited, { raw: { width: canvasW, height: canvasH, channels: 4 } })
    .resize({ width: OUT_WIDTH, height: outHeight, fit: 'fill' })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(join(OUT_DIR, outName))
}

rmSync(RAW_DIR, { recursive: true, force: true })
console.log(`Done. Wrote ${buffers.length} frames to ${OUT_DIR}/`)
