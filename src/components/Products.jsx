import { PRODUCTS } from '../data/products'
import { ArrowRightIcon } from './icons'
import ProductMark from './ProductMark'

// The design's hover green, shared by everything on a card.
const HOVER_TEXT = 'transition-colors duration-300 group-hover:text-[#32471f]'

function ProductCard({ slug, number, title, cardLine, art, notes }) {
  return (
    <a
      href={`/products/${slug}`}
      className="group flex h-[470px] flex-col gap-8 rounded-xl bg-canvas px-[18px] py-6 transition-colors duration-300 hover:bg-[#c0ceac]"
    >
      <div className="flex items-center justify-between">
        <span className={`text-[14px] text-muted ${HOVER_TEXT}`}>{number}</span>
        <span className="flex h-6 w-6 items-center justify-center">
          <ProductMark width={16} height={17} className={`text-ink ${HOVER_TEXT}`} />
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className={`text-[24px] text-ink ${HOVER_TEXT}`}>{title}</h3>
        <p className={`text-[16px] text-muted ${HOVER_TEXT}`}>{cardLine}</p>
      </div>

      {/* The picture is laid out at the design's 295×220 and steps 8px left on
          hover, as in the hover variant. */}
      <div className="relative mx-auto h-[220px] w-[295px] shrink-0">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-x-2">
          {art.map(({ src, x, y, w, h, overlay }) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              className={`absolute select-none ${overlay ? 'mix-blend-overlay' : ''}`}
              style={{ left: x, top: y, width: w, height: h }}
              draggable={false}
            />
          ))}
          {notes.map(({ text, x, y, w }) => (
            <span
              key={text}
              className={`absolute text-[8px] uppercase leading-[1.2] text-muted ${HOVER_TEXT}`}
              style={{ left: x, top: y, width: w }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className={`text-[12px] uppercase text-muted ${HOVER_TEXT}`}>
          // weapon training system
        </span>
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[0.5px] border-ink text-ink transition-colors duration-300 group-hover:border-[#32471f] group-hover:bg-[#32471f] group-hover:text-paper">
          <ArrowRightIcon width={24} height={24} />
        </span>
      </div>
    </a>
  )
}

export default function Products() {
  return (
    <section
      id="products"
      className="rounded-t-3xl bg-paper px-6 pb-16 pt-24 lg:rounded-none lg:pb-[135px] lg:pt-[124px]"
    >
      <p className="mb-3 text-[12px] uppercase leading-[14px] text-muted">// products</p>
      <h2 className="mb-9 text-[28px] font-light leading-[1.22] lg:mb-12 lg:text-[32px]">
        Training solutions
        <br />
        <span className="font-thin text-muted">for real-world challenges.</span>
      </h2>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>
    </section>
  )
}
