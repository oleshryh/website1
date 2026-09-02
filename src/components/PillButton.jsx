import { ArrowRight } from 'lucide-react'

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

export default function PillButton({
  children,
  variant = 'dark',
  as = 'a',
  className = '',
  ...props
}) {
  const Tag = as
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
