import { ArrowRightIcon } from './icons'

// The design's button: a capsule with the label on the left and the arrow in
// its own circle at the right end. `dark` is ink on the light ground, `light`
// the paper one for dark blocks. Both turn the design's green on hover.
const VARIANTS = {
  dark: {
    shell: 'bg-ink text-paper hover:bg-[#c0ceac] hover:text-[#32471f]',
    bubble: 'bg-paper text-ink group-hover:text-[#32471f]',
  },
  light: {
    shell: 'bg-paper text-ink hover:bg-[#c0ceac] hover:text-[#32471f]',
    bubble: 'bg-ink text-paper group-hover:bg-paper group-hover:text-[#32471f]',
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
      className={`group inline-flex h-[64px] items-center rounded-full p-1 text-[16px] font-light transition-colors duration-300 disabled:opacity-50 lg:h-[76px] lg:text-[18px] ${shell} ${className}`}
    >
      <span className="px-5 lg:px-6">{children}</span>
      <span
        aria-hidden="true"
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors duration-300 lg:h-[68px] lg:w-[68px] ${bubble}`}
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
