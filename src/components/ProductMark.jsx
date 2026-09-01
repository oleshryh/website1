// Shared mark for every product card — the site's shield outline, filled on hover.
export default function ProductMark(props) {
  return (
    <svg viewBox="0 0 34 32" fill="none" {...props}>
      <path
        d="M17 1 L31 8 V17 C31 24 25 29 17 31 C9 29 3 24 3 17 V8 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="fill-transparent transition-colors duration-300 group-hover:fill-current"
      />
    </svg>
  )
}
