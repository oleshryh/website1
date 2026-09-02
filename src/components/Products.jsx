import { ArrowRight } from 'lucide-react'
import { PHOTO_TINT, PRODUCTS } from '../data/products'
import useScrollFade from './useScrollFade'

// The site sets the qualifying word of a phrase in muted grey — "designed for
// realistic military training scenarios" in the hero, "next-generation VR
// training systems" on the second screen. The product names carry the same
// device: what the system trains is the name, that it is training is the tail.
function splitTail(name) {
  const at = name.lastIndexOf(' ')
  return at === -1 ? [name, ''] : [name.slice(0, at), name.slice(at + 1)]
}

// One row per system, not a grid of tiles: these read as an offer sheet rather
// than a shop. The hover treatment is the products menu's — photo wash under
// the type, everything shifting into the same green — but the type is the
// menu's turned up: an index numeral, a headline-sized name, a description
// held to one narrow column.
function ProductRow({ product: { slug, name, description, image }, progress, index }) {
  const start = 0.5 + index * 0.07
  const opacity = useScrollFade(progress, [start, start + 0.16], [0, 1])
  const lift = useScrollFade(progress, [start, start + 0.16], [16, 0])
  const [lead, tail] = splitTail(name)

  return (
    <a
      href={`/products/${slug}`}
      style={{ opacity, transform: `translateY(${lift}px)` }}
      className="group relative isolate grid grid-cols-[auto_1fr_auto] items-start gap-x-5 border-t border-ink/10 py-6 last:border-b sm:gap-x-7 lg:py-7"
    >
      <span
        aria-hidden="true"
        style={{ backgroundImage: `${PHOTO_TINT}, url('${image}')` }}
        className="absolute inset-x-[-20px] inset-y-0 -z-10 rounded-lg bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="mt-1 text-[20px] font-extralight leading-none tabular-nums text-ink/25 transition-colors duration-300 group-hover:text-[#31461f]/60 lg:text-[24px]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
        <h3 className="text-[20px] font-medium leading-[1.15] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-[#223213] sm:text-[23px] lg:text-[26px]">
          {lead} {tail && <span className="font-light text-muted group-hover:text-[#3d5228]">{tail}</span>}
        </h3>
        <p className="mt-1.5 max-w-[330px] text-[13px] font-light leading-[1.35] text-ink/55 transition-colors duration-300 group-hover:text-[#3d5228] lg:text-[14px]">
          {description}
        </p>
      </span>
      <ArrowRight
        size={18}
        strokeWidth={1.4}
        className="mt-1.5 text-ink/30 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-[#31461f]"
      />
    </a>
  )
}

export default function Products({ progress }) {
  const headerOpacity = useScrollFade(progress, [0.42, 0.58], [0, 1])
  // Nothing here may take the cursor before it has arrived, or the invisible
  // links sit on top of the first two screens.
  const live = useScrollFade(progress, [0.5, 0.52], [0, 1]) > 0

  return (
    <section
      id="products"
      aria-label="Products"
      style={{ pointerEvents: live ? 'auto' : 'none' }}
      // The right bound is what keeps the list clear of the parked figure, and
      // it also gives the inner w-full something to measure against.
      className="absolute inset-y-0 left-6 right-6 flex items-start pt-32 md:left-9 lg:right-[52%] lg:items-center lg:pt-0"
    >
      <div className="w-full max-w-[760px] xl:max-w-[900px]">
        <div style={{ opacity: headerOpacity }} className="mb-6 lg:mb-7">
          <p className="mb-2 text-[11px] font-normal uppercase tracking-[0.16em] text-muted">
            Products
          </p>
          <h2 className="max-w-[440px] text-[17px] font-medium leading-[21px] sm:text-[19px] lg:text-[22px] lg:leading-[27px]">
            Three systems, <span className="text-muted">one training platform</span>.
          </h2>
        </div>
        {PRODUCTS.map((product, index) => (
          <ProductRow key={product.slug} product={product} progress={progress} index={index} />
        ))}
      </div>
    </section>
  )
}
