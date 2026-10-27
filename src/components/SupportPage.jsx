import { useState } from 'react'
import { FAQ } from '../data/faq'
import { EMAIL, PHONE } from '../data/socials'
import submitLead from '../data/submitLead'
import { useT } from '../i18n'
import { PRIVACY_PATH } from '../routes'
import FormField from './FormField'
import { ChevronDownIcon } from './icons'
import PageShell, { PageHeading } from './PageShell'
import PillButton from './PillButton'

const pad = (n) => String(n).padStart(2, '0')

// Questions as rows like the vacancies; one opens at a time.
function Questions() {
  const t = useT()
  const [open, setOpen] = useState(0)

  return (
    <ul className="flex flex-col gap-2">
      {FAQ.map(({ q, a }, i) => {
        const isOpen = open === i
        return (
          <li key={q.en} className="rounded-xl bg-paper">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="grid w-full grid-cols-[32px_1fr_auto] items-center gap-3 p-6 text-left"
            >
              <span className="text-[14px] text-muted">{pad(i + 1)}</span>
              <span className="text-[18px] text-ink lg:text-[20px]">{t(q)}</span>
              <ChevronDownIcon
                width={20}
                height={21}
                className={`text-ink transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="max-w-[640px] px-6 pb-6 text-[16px] font-light leading-[1.4] text-[#929292] sm:pl-[68px]">
                {t(a)}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}

// A short question form: who is asking, how to answer, and the question.
function QuestionForm() {
  const t = useT()
  const [state, setState] = useState('idle')

  const onSubmit = async (event) => {
    event.preventDefault()
    setState('sending')
    try {
      await submitLead({ kind: 'support', ...Object.fromEntries(new FormData(event.currentTarget)) })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div aria-live="polite" className="flex flex-col gap-3">
        <p className="text-[24px] font-light">{t({ en: 'Question received.', ua: 'Питання отримано.' })}</p>
        <p className="text-[16px] font-light leading-[1.3] text-muted">
          {t({
            en: 'We’ll answer within one working day.',
            ua: 'Ми відповімо протягом одного робочого дня.',
          })}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <FormField name="name" label={{ en: 'Name', ua: 'Ім’я' }} autoComplete="name" required />
        <FormField
          name="contact"
          label={{ en: 'Phone or email', ua: 'Телефон або пошта' }}
          autoComplete="email"
          required
        />
      </div>
      <FormField name="question" label={{ en: 'Your question', ua: 'Ваше питання' }} rows={3} required />

      {state === 'error' && (
        <p role="alert" className="text-[14px] font-light">
          {t({
            en: 'Something went wrong. Please try again in a moment.',
            ua: 'Щось пішло не так. Спробуйте ще раз за хвилину.',
          })}
        </p>
      )}

      <PillButton as="button" type="submit" disabled={state === 'sending'} className="self-start">
        {state === 'sending'
          ? t({ en: 'Sending', ua: 'Надсилаємо' })
          : t({ en: 'Ask', ua: 'Запитати' })}
      </PillButton>
      <p className="text-[12px] font-light text-muted">
        {t({
          en: 'By sending the question you agree to our ',
          ua: 'Надсилаючи питання, ви погоджуєтеся з нашою ',
        })}
        <a href={PRIVACY_PATH} className="underline underline-offset-2 hover:text-ink">
          {t({ en: 'privacy policy', ua: 'політикою конфіденційності' })}
        </a>
        .
      </p>
    </form>
  )
}

// Support: frequently asked questions, a short form for anything else, and the
// phone for when it can't wait.
export default function SupportPage() {
  const t = useT()

  return (
    <PageShell>
      <PageHeading
        label={{ en: '// support', ua: '// підтримка' }}
        title={{ en: 'How can we', ua: 'Чим можемо' }}
        thin={{ en: 'help?', ua: 'допомогти?' }}
        lead={{
          en: 'Answers to what units ask most often — and a way to ask us anything else.',
          ua: 'Відповіді на те, що підрозділи питають найчастіше, — і спосіб запитати нас про будь-що інше.',
        }}
      />

      <section className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-6">
        <div>
          <h2 className="mb-6 text-[12px] uppercase text-muted">
            {t({ en: '// frequently asked', ua: '// часті питання' })}
          </h2>
          <Questions />
        </div>

        <div>
          <h2 className="mb-6 text-[12px] uppercase text-muted">
            {t({ en: '// ask a question', ua: '// поставити питання' })}
          </h2>
          <div className="rounded-xl bg-paper px-6 py-9 lg:px-9">
            <QuestionForm />
          </div>
        </div>
      </section>

      {/* For when it can't wait. */}
      <section className="mt-16 flex flex-col gap-8 rounded-3xl bg-ink px-6 py-16 text-paper md:flex-row md:items-center md:justify-between lg:px-16">
        <div className="flex flex-col gap-3">
          <h2 className="text-[28px] font-thin leading-[1.2] lg:text-[44px]">
            {t({ en: 'Still have questions?', ua: 'Залишилися питання?' })}
          </h2>
          <p className="max-w-[360px] text-[16px] font-light leading-[1.3] text-[#929292]">
            {t({
              en: 'Call us — we’ll answer straight away.',
              ua: 'Зателефонуйте нам — відповімо одразу.',
            })}
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="text-[28px] font-light transition-colors hover:text-[#c0ceac] lg:text-[40px]"
          >
            {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="text-[16px] font-light text-[#929292] underline underline-offset-4 hover:text-paper">
            {EMAIL}
          </a>
        </div>
      </section>
    </PageShell>
  )
}
