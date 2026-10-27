import { FacebookIcon, InstagramIcon, PhoneIcon, YoutubeIcon } from '../components/icons'

// The company's contacts, as on atmaraksi.com. Instagram, Facebook and YouTube
// are placeholders until the real accounts are known.
export const PHONE = '+380 67 970 08 79'
export const EMAIL = 'info@atmaraksi.com'

export const SOCIALS = [
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
  { Icon: FacebookIcon, label: 'Facebook', href: '#' },
  { Icon: YoutubeIcon, label: 'YouTube', href: '#' },
  { Icon: PhoneIcon, label: 'Phone', href: `tel:${PHONE.replace(/\s/g, '')}` },
]
