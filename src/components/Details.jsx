import PillButton from './PillButton'

// The closing call to action. Every "talk to sales" on the page scrolls here
// (#details). Where this last button leads (an email, a phone, a form) is still
// to be decided, so it goes nowhere yet.
export default function Details() {
  return (
    <section
      id="details"
      className="flex scroll-mt-[136px] flex-col items-start gap-10 rounded-t-[36px] bg-ink px-6 py-16 text-paper md:flex-row md:items-center md:justify-between lg:h-[359px] lg:py-0 lg:pl-16 lg:pr-[124px]"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-[32px] font-thin leading-[1.2] lg:text-[44px]">
          Ready to discuss the details?
        </h2>
        <p className="max-w-[333px] text-[16px] font-light leading-[1.2] text-[#929292]">
          Tell us about your training needs. We’ll help you find the right VR solution for your
          team.
        </p>
      </div>
      <PillButton variant="light" href="#">
        Talk To Sales
      </PillButton>
    </section>
  )
}
