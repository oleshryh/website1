import { useT } from '../i18n'
import { INPUT, LABEL } from './formStyles'

// One labelled input in the site's form look; `rows` makes it a text area.
export default function FormField({ name, label, type = 'text', autoComplete, required, rows }) {
  const t = useT()
  return (
    <label className="block">
      <span className={LABEL}>
        {t(label)}
        {required && ' *'}
      </span>
      {rows ? (
        <textarea name={name} rows={rows} required={required} className={`${INPUT} resize-none`} />
      ) : (
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className={INPUT}
        />
      )}
    </label>
  )
}
