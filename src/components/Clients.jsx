import { useRef, useState } from 'react'
import { CLIENTS } from '../data/clients'
import DemoModal from './DemoModal'

const pad = (n) => String(n).padStart(2, '0')

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 31 35" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M28.63 13.6c2.66 1.54 2.66 5.4 0 6.93L6 33.6c-2.67 1.54-6-.39-6-3.47V4.01C0 .93 3.33-1 6 .54l22.63 13.07Z" />
    </svg>
  )
}

function Story({ index, client: { name, quote, author, product, video } }) {
  const [demoOpen, setDemoOpen] = useState(false)
  const [origin, setOrigin] = useState(null)
  const videoRef = useRef(null)

  const openVideo = () => {
    const rect = videoRef.current?.getBoundingClientRect()
    if (rect) setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    setDemoOpen(true)
  }

  return (
    <div className="flex flex-col-reverse gap-6 rounded-xl bg-paper px-6 py-9 lg:flex-row lg:justify-between">
      <div className="flex gap-24">
        <span className="hidden text-[12px] uppercase lg:block">
          {pad(index + 1)} / {pad(CLIENTS.length)}
        </span>
        <div className="flex max-w-[503px] flex-col gap-6">
          <p className="text-[12px] uppercase text-muted">{name}</p>
          {quote ? (
            <div className="flex flex-col gap-4">
              <blockquote className="text-[20px] font-light leading-[1.2] lg:text-[24px]">
                {quote}
              </blockquote>
              <p className="flex flex-wrap items-center gap-x-[9px] text-[12px] uppercase text-muted">
                <span>{author}</span>
                <span aria-hidden="true" className="text-[16px]">
                  |
                </span>
                <span>{product}</span>
              </p>
            </div>
          ) : (
            <p className="text-[20px] font-light leading-[1.2] text-muted lg:text-[24px]">
              Story coming soon.
            </p>
          )}
        </div>
      </div>

      {video && (
        <button
          ref={videoRef}
          type="button"
          onClick={openVideo}
          aria-label="Play video"
          className="group relative aspect-[406/227] w-full shrink-0 overflow-hidden rounded-xl lg:w-[406px]"
        >
          <img src={video} alt="" loading="lazy" className="h-full w-full object-cover" />
          <PlayIcon
            width={31}
            height={35}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-paper transition-transform duration-300 group-hover:scale-110"
          />
        </button>
      )}

      <DemoModal open={demoOpen} origin={origin} onClose={() => setDemoOpen(false)} />
    </div>
  )
}

export default function Clients() {
  // Opens on the one story the design shows.
  const [active, setActive] = useState(CLIENTS.findIndex((client) => client.quote))

  return (
    <section className="bg-canvas px-6 py-[124px]">
      <p className="mb-3 text-[12px] uppercase leading-[14px] text-muted">// client stories</p>
      <h2 className="mb-12 text-[24px] font-light leading-[1.22] sm:text-[28px] lg:text-[32px]">
        What our clients
        <br />
        <span className="font-thin text-muted">say about us.</span>
      </h2>

      <div role="tablist" className="mb-6 flex gap-6 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CLIENTS.map((client, i) => (
          <button
            key={client.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`border-b py-1 text-[16px] capitalize leading-[19px] transition-colors ${
              i === active ? 'border-black text-ink' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {client.name}
          </button>
        ))}
      </div>

      <Story index={active} client={CLIENTS[active]} />
    </section>
  )
}
