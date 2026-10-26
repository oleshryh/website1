// The site's pages and files. There is no router: main.jsx picks the page by
// path.
//
// Everything goes through url() so the site works both at the root (locally)
// and from a sub-folder (GitHub Pages serves it at /website1/). The folder is
// Vite's `base`, set by the build command; it is '/' everywhere else.
const BASE = import.meta.env.BASE_URL

export const url = (path = '') => BASE + path.replace(/^\//, '')

export const CONTACT_PATH = url('contact')
