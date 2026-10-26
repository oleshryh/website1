import { useState } from 'react'
import { PRODUCTS } from '../data/products'
import submitLead from '../data/submitLead'
import { useT } from '../i18n'
import Footer from './Footer'
import Header from './Header'
import PillButton from './PillButton'
import { url } from '../routes'

// The request form every "talk to sales" leads to. The design has no page for
// it, so it borrows the home page's pieces: the same header and footer, the
// light card of the client stories, the label-and-headline opening of every
// block.

const FIELDS = [
  {
    name: 'name',
    label: { en: 'Name', ua: 'Ім’я' },
    type: 'text',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'organization',
    label: { en: 'Organization', ua: 'Організація' },
    type: 'text',
    autoComplete: 'organization',
  },
  {
    name: 'phone',
    label: { en: 'Phone', ua: 'Телефон' },
    type: 'tel',
    autoComplete: 'tel',
    required: true,
  },
  { name: 'email', label: { en: 'Email', ua: 'Пошта' }, type: 'email', autoComplete: 'email' },
]

const LABEL = 'mb-2 block text-[12px] uppercase text-muted'
const INPUT =
  'w-full border-b-[0.5px] border-muted bg-transparent pb-2 text-[16px] font-light text-ink outline-none transition-colors duration-300 focus:border-ink'

function Field({ name, label, type, autoComplete, required }) {
  const t = useT()
  return (
    <label className="block">
      <span className={LABEL}>
        {t(label)}
        {required && ' *'}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={INPUT}
      />
    </label>
  )
}

function RequestForm() {
  const t = useT()
  const [state, setState] = useState('idle')
  const [error, setError] = useState(null)

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
      setError({
        en: 'Something went wrong. Please try again in a moment.',
        ua: 'Щось пішло не так. Спробуйте ще раз за хвилину.',
      })
    }
  }

  if (state === 'sent') {
    return (
      <div aria-live="polite" className="flex flex-col items-start gap-4">
        <p className="text-[24px] font-light">
          {t({ en: 'Request received.', ua: 'Заявку отримано.' })}
        </p>
        <p className="max-w-[380px] text-[16px] font-light leading-[1.2] text-muted">
          {t({
            en: 'We’ll come back to you within one working day, on the phone you left.',
            ua: 'Ми зв’яжемося з вами протягом одного робочого дня за вказаним телефоном.',
          })}
        </p>
        <a href={url()} className="text-[16px] font-light underline underline-offset-4">
          {t({ en: 'Back to the home page', ua: 'Повернутися на головну' })}
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <Field key={field.name} {...field} />
        ))}

        <label className="block sm:col-span-2">
          <span className={LABEL}>{t({ en: 'Training system', ua: 'Тренажер' })}</span>
          <select name="product" defaultValue="" className={`${INPUT} cursor-pointer`}>
            <option value="">{t({ en: 'Not sure yet', ua: 'Ще не визначились' })}</option>
            {PRODUCTS.map(({ slug, title }) => (
              <option key={slug} value={title.en}>
                {t(title)}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className={LABEL}>{t({ en: 'Message', ua: 'Повідомлення' })}</span>
          <textarea name="message" rows={3} className={`${INPUT} resize-none`} />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-[14px] font-light">
          {t(error)}
        </p>
      )}

      <PillButton as="button" type="submit" disabled={state === 'sending'} className="self-start">
        {state === 'sending'
          ? t({ en: 'Sending', ua: 'Надсилаємо' })
          : t({ en: 'Send Request', ua: 'Надіслати заявку' })}
      </PillButton>
    </form>
  )
}

export default function ContactPage() {
  const t = useT()
  return (
    <div className="bg-canvas">
      <Header />

      <main className="grid gap-12 px-6 pb-[124px] pt-[180px] lg:grid-cols-2 lg:gap-6 lg:pt-[220px]">
        <div>
          <p className="mb-3 text-[12px] uppercase leading-[14px] text-muted">
            {t({ en: '// talk to sales', ua: '// зв’язатися з нами' })}
          </p>
          <h1 className="mb-6 text-[24px] font-light leading-[1.22] sm:text-[28px] lg:text-[32px]">
            {t({ en: 'Tell us about your', ua: 'Розкажіть про ваші' })}
            <br />
            <span className="font-thin text-muted">
              {t({ en: 'training needs.', ua: 'потреби в навчанні.' })}
            </span>
          </h1>
          <p className="max-w-[393px] text-[16px] font-light leading-[1.2] text-[#929292]">
            {t({
              en: (
                <>
                  Leave your contacts and a few words about your unit. We’ll help you find the
                  right <span className="text-ink">VR solution</span> and arrange a demo.
                </>
              ),
              ua: (
                <>
                  Залиште контакти та кілька слів про ваш підрозділ. Ми допоможемо підібрати{' '}
                  <span className="text-ink">VR-рішення</span> й організуємо демонстрацію.
                </>
              ),
            })}
          </p>
        </div>

        <div className="rounded-xl bg-paper px-6 py-9 lg:px-9">
          <RequestForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
