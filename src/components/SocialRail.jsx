import { SOCIALS } from '../data/socials'

// One square button from the design, shared with the footer and the phone
// menu, where the design draws it larger. Turns the site's green on hover.
export function SocialButton({ Icon, label, href, size }) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`flex items-center justify-center rounded bg-paper text-ink transition-[background-color,box-shadow] duration-200 hover:bg-[#c0ceac] hover:shadow-[2px_4px_8px_rgba(69,69,69,0.1)] ${
        size === 'large' ? 'h-11 w-11' : 'h-9 w-9'
      }`}
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
