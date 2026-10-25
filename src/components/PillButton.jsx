import { ArrowRight } from 'lucide-react'
import { ArrowRightIcon } from './icons'

// The site's one button shape: a capsule with the label on the left and the
// arrow in its own circle at the right end. `light` is the white-on-black form
// the contact screen uses, `dark` the ink-on-canvas form for the light panel.
const VARIANTS = {
  dark: {
    shell: 'bg-ink text-white hover:bg-ink/90',
    bubble: 'bg-white text-ink',
  },
  light: {
    shell: 'bg-white text-ink hover:bg-white/90',
    bubble: 'bg-ink text-white',
  },
  outline: {
    shell: 'border border-ink/20 text-ink hover:border-ink/40',
    bubble: 'bg-ink text-white',
  },
}

// The design's small header button: label, then the arrow in a hairline ring.
function MediumPillButton({ children, as: Tag, className, ...props }) {
  return (
    <Tag
      {...props}
      className={`group inline-flex h-[38px] items-center rounded-full bg-ink py-1 pl-2 pr-[2.5px] text-[14px] font-light text-paper transition-colors duration-300 hover:bg-ink/90 ${className}`}
    >
      <span className="px-2">{children}</span>
      <span
        aria-hidden="true"
        className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-paper"
      >
        <ArrowRightIcon
          width={24}
          height={24}
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        />
      </span>
    </Tag>
  )
}

export default function PillButton({
  children,
  variant = 'dark',
  size = 'big',
  as = 'a',
  className = '',
  ...props
}) {
  const Tag = as
  if (size === 'medium') {
    return (
      <MediumPillButton as={Tag} className={className} {...props}>
        {children}
      </MediumPillButton>
    )
  }
  const { shell, bubble } = VARIANTS[variant] ?? VARIANTS.dark

  return (
    <Tag
      {...props}
      className={`group inline-flex items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-normal transition-colors duration-300 disabled:opacity-50 sm:gap-5 sm:pl-7 sm:text-[15px] ${shell} ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:scale-105 sm:h-11 sm:w-11 ${bubble}`}
      >
        <ArrowRight
          size={16}
          strokeWidth={1.6}
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        />
      </span>
    </Tag>
  )
}
