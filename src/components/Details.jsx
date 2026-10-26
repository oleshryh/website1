import { CONTACT_PATH } from '../routes'
import PillButton from './PillButton'

// The closing call to action; like every "talk to sales" it opens the request
// form page.
export default function Details() {
  return (
    <section
      id="details"
      className="flex flex-col items-start gap-10 rounded-t-3xl bg-ink px-3 py-24 text-paper md:flex-row md:px-6 md:items-center md:justify-between lg:h-[359px] lg:rounded-t-[36px] lg:py-0 lg:pl-16 lg:pr-[124px]"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-[24px] font-thin leading-[1.2] lg:text-[44px]">
          Ready to discuss <br className="lg:hidden" />
          the details?
        </h2>
        <p className="max-w-[333px] text-[16px] font-light leading-[1.2] text-[#929292]">
          Tell us about your training needs. We’ll help you find the right VR solution for your
          team.
        </p>
      </div>
      <PillButton variant="light" href={CONTACT_PATH}>
        Talk To Sales
      </PillButton>
    </section>
  )
}
