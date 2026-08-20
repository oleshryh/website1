import { mkdir, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const OUT = new URL('../public/products/', import.meta.url)

const W = 640
const H = 420

// Same palette everywhere, only the light direction and density change, so the
// three cards read as one photo set.
const VARIANTS = [
  { name: 'machine-gun', deep: '#7f9a63', mid: '#9db47f', lift: '#c8d9ad', lightX: 0.24, lightY: 0.18, density: 15 },
  { name: 'rpg-7', deep: '#829d67', mid: '#a0b683', lift: '#cbdbb1', lightX: 0.68, lightY: 0.22, density: 12 },
  { name: 'fpv-drone', deep: '#7c9760', mid: '#9ab27c', lift: '#c5d7a9', lightX: 0.46, lightY: 0.12, density: 18 },
]

function canopy({ deep, mid, lift, lightX, lightY, density }) {
  let blobs = ''
  // Deterministic pseudo-random so regenerating gives the same picture.
  let seed = 7
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648)

  for (let i = 0; i < density; i += 1) {
    const cx = rand() * W
    const cy = rand() * H * 0.85
    const r = 60 + rand() * 150
    const o = 0.12 + rand() * 0.3
    blobs += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="url(#leaf)" opacity="${o.toFixed(2)}"/>`
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${mid}"/>
      <stop offset="1" stop-color="${deep}"/>
    </linearGradient>
    <radialGradient id="leaf" cx="0.4" cy="0.35" r="0.7">
      <stop offset="0" stop-color="${lift}"/>
      <stop offset="1" stop-color="${deep}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sun" cx="${lightX}" cy="${lightY}" r="0.55">
      <stop offset="0" stop-color="#f2f8e4" stop-opacity="0.65"/>
      <stop offset="1" stop-color="#f2f8e4" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="26"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g filter="url(#soft)">${blobs}</g>
  <rect width="${W}" height="${H}" fill="url(#sun)"/>
</svg>`
}

await mkdir(OUT, { recursive: true })

for (const variant of VARIANTS) {
  const buffer = await sharp(Buffer.from(canopy(variant)))
    .jpeg({ quality: 82 })
    .toBuffer()
  await writeFile(new URL(`${variant.name}.jpg`, OUT), buffer)
  console.log('wrote', variant.name + '.jpg', buffer.length, 'bytes')
}
