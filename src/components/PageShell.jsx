import { useT } from '../i18n'
import Footer from './Footer'
import Header from './Header'

// The frame of every inner page: the header, a block opening the way the home
// page's blocks do ("// label", a headline with a thin second line, a lead),
// the page's own content, and the footer.
export function PageHeading({ label, title, thin, lead }) {
  const t = useT()
  return (
    <div className="mb-12 lg:mb-16">
      <p className="mb-3 text-[12px] uppercase leading-[14px] text-muted">{t(label)}</p>
      <h1 className="text-[28px] font-light leading-[1.22] lg:text-[44px]">
        {t(title)}
        {thin && (
          <>
            <br />
            <span className="font-thin text-muted">{t(thin)}</span>
          </>
        )}
      </h1>
      {lead && (
        <p className="mt-6 max-w-[520px] text-[16px] font-light leading-[1.3] text-[#929292]">
          {t(lead)}
        </p>
      )}
    </div>
  )
}

export default function PageShell({ children }) {
  return (
    <div className="bg-canvas">
      <Header />
      <main className="px-3 pb-[124px] pt-[160px] md:px-6 lg:pt-[200px]">{children}</main>
      <Footer />
    </div>
  )
}
