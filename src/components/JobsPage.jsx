import { useState } from 'react'
import { JOBS } from '../data/jobs'
import { EMAIL } from '../data/socials'
import { useT } from '../i18n'
import { CONTACT_PATH } from '../routes'
import { ChevronDownIcon } from './icons'
import PageShell, { PageHeading } from './PageShell'
import PillButton from './PillButton'

const pad = (n) => String(n).padStart(2, '0')

// Vacancies — each a row like the product list; open one to read more.
export default function JobsPage() {
  const t = useT()
  const [open, setOpen] = useState(0)

  return (
    <PageShell>
      <PageHeading
        label={{ en: '// jobs', ua: '// вакансії' }}
        title={{ en: 'Build what', ua: 'Створюйте те,' }}
        thin={{ en: 'trains the defenders.', ua: 'на чому вчаться захисники.' }}
        lead={{
          en: 'Engineers, developers and instructors make our simulators together. Here is who we are looking for.',
          ua: 'Наші тренажери разом створюють інженери, розробники та інструктори. Ось кого ми шукаємо.',
        }}
      />

      <ul className="flex flex-col gap-2">
        {JOBS.map((job, i) => {
          const isOpen = open === i
          return (
            <li key={job.title.en} className="rounded-xl bg-paper">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 p-6 text-left md:grid-cols-[40px_1fr_320px_auto]"
              >
                <span className="text-[14px] text-muted">{pad(i + 1)}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-[20px] text-ink lg:text-[24px]">{t(job.title)}</span>
                  <span className="text-[14px] text-muted md:hidden">{t(job.place)}</span>
                </span>
                <span className="hidden text-[14px] text-muted md:block">
                  {t(job.team)} · {t(job.place)}
                </span>
                <ChevronDownIcon
                  width={20}
                  height={21}
                  className={`text-ink transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="flex flex-col gap-6 px-6 pb-8 md:pl-[80px]">
                  <p className="max-w-[560px] text-[16px] font-light leading-[1.3] text-[#929292]">
                    {t(job.text)}
                  </p>
                  <ul className="flex flex-col gap-2 text-[16px] font-light">
                    {job.tasks.map((task) => (
                      <li key={task.en}>— {t(task)}</li>
                    ))}
                  </ul>
                  <PillButton href={CONTACT_PATH} className="self-start">
                    {t({ en: 'Apply', ua: 'Відгукнутися' })}
                  </PillButton>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <p className="mt-12 text-[16px] font-light text-[#929292]">
        {t({
          en: 'Didn’t find your role? Tell us about yourself: ',
          ua: 'Не знайшли свою роль? Розкажіть про себе: ',
        })}
        <a href={`mailto:${EMAIL}`} className="text-ink underline underline-offset-4">
          {EMAIL}
        </a>
      </p>
    </PageShell>
  )
}
