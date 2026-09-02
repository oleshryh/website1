import { useState } from 'react'
import submitLead from '../data/submitLead'
import PillButton from './PillButton'
import useScrollFade from './useScrollFade'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: false },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: false },
]

// Same hairline language as the product rows, inverted for the dark screen: no
// boxes, just a rule that lights up under the field being filled.
function Field({ name, label, type, autoComplete, required }) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[11px] font-normal uppercase tracking-[0.16em] text-white/40 transition-colors duration-300 group-focus-within:text-white/70">
        {label}
        {required && <span className="ml-1 text-white/30">*</span>}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full border-b border-white/15 bg-transparent pb-2.5 text-[15px] font-light text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-white/70"
      />
    </label>
  )
}

export default function ContactScreen({ progress }) {
  const [state, setState] = useState('idle')
  const [error, setError] = useState(null)

  // Rises into place as the panel above clears the screen.
  const opacity = useScrollFade(progress, [0.25, 0.7], [0, 1])
  const lift = useScrollFade(progress, [0.25, 0.7], [24, 0])
  const live = useScrollFade(progress, [0.5, 0.52], [0, 1]) > 0

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    setState('sending')
    setError(null)
    try {
      await submitLead(data)
      setState('sent')
    } catch {
      setState('idle')
      setError('Something went wrong. Please try again or call us directly.')
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{ pointerEvents: live ? 'auto' : 'none' }}
      className="fixed inset-0 z-0 flex items-center bg-ink px-6 md:px-9"
    >
      <div
        style={{ opacity, transform: `translateY(${lift}px)` }}
        className="w-full max-w-[520px] lg:max-w-[560px]"
      >
        <p className="mb-2 text-[11px] font-normal uppercase tracking-[0.16em] text-white/40">
          Contact
        </p>
        <h2 className="mb-8 max-w-[440px] text-[20px] font-medium leading-[1.25] text-white sm:text-[23px] lg:mb-10 lg:text-[26px]">
          Tell us what you train for,{' '}
          <span className="font-light text-white/45">we'll build the system</span>.
        </h2>

        {state === 'sent' ? (
          <div aria-live="polite">
            <p className="text-[17px] font-medium text-white sm:text-[19px]">Request received.</p>
            <p className="mt-2 max-w-[380px] text-[13px] font-light leading-[1.4] text-white/50 sm:text-[14px]">
              We'll come back to you within one working day, on the number you left.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate={false}>
            <div className="grid gap-6 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <Field key={field.name} {...field} />
              ))}
              <label className="group block sm:col-span-2">
                <span className="mb-2 block text-[11px] font-normal uppercase tracking-[0.16em] text-white/40 transition-colors duration-300 group-focus-within:text-white/70">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={2}
                  className="w-full resize-none border-b border-white/15 bg-transparent pb-2.5 text-[15px] font-light text-white outline-none transition-colors duration-300 focus:border-white/70"
                />
              </label>
            </div>

            {error && (
              <p role="alert" className="mt-5 text-[13px] font-light text-white/70">
                {error}
              </p>
            )}

            <PillButton as="button" type="submit" variant="light" disabled={state === 'sending'} className="mt-9">
              {state === 'sending' ? 'Sending' : 'Send Request'}
            </PillButton>
          </form>
        )}
      </div>
    </section>
  )
}
