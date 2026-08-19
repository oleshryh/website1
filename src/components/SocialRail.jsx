function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13.8 8.6h1.4V6.2h-1.6c-1.9 0-2.9 1.1-2.9 2.8v1.4H9.2v2.4h1.5V18h2.5v-5.2h1.7l.4-2.4h-2.1V9.2c0-.4.2-.6.6-.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
}

const SOCIALS = [
  { Icon: YoutubeIcon, label: 'YouTube' },
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: InstagramIcon, label: 'Instagram' },
]

export default function SocialRail() {
  return (
    <div className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 md:right-6">
      {SOCIALS.map(({ Icon, label }) => (
        <a
          key={label}
          href="#"
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-ink shadow-sm transition-all duration-200 hover:-translate-x-1 hover:shadow-md"
        >
          <Icon width={18} height={18} />
        </a>
      ))}
    </div>
  )
}
