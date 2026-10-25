import { SOCIALS } from '../data/socials'

// One square button from the design, shared with the footer.
export function SocialButton({ Icon, label, href }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded bg-paper text-ink transition-shadow duration-200 hover:shadow-[2px_4px_4px_rgba(69,69,69,0.1)]"
    >
      <Icon width={24} height={24} />
    </a>
  )
}

// On the first two screens only: it sits on the pinned screen and leaves with it.
export default function SocialRail() {
  return (
    <div className="absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:right-6 md:flex">
      {SOCIALS.map((social) => (
        <SocialButton key={social.label} {...social} />
      ))}
    </div>
  )
}
