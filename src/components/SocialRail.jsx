import { SOCIALS } from '../data/socials'
import useScrollFade from './useScrollFade'

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

export default function SocialRail({ exit }) {
  // The rail sits in the lane the figure parks in on the third screen, and
  // floating buttons over the soldier read as clutter — so it steps aside with
  // the rest of the first two screens.
  const opacity = useScrollFade(exit, [0.3, 0.55], [1, 0])

  return (
    <div
      style={{ opacity, pointerEvents: opacity === 0 ? 'none' : undefined }}
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:right-6 md:flex"
    >
      {SOCIALS.map((social) => (
        <SocialButton key={social.label} {...social} />
      ))}
    </div>
  )
}
