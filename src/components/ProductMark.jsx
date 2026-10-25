// Shared mark for every product card — the site's shield outline, filled on hover.
export default function ProductMark(props) {
  return (
    <svg viewBox="0 0 17 18" fill="none" {...props}>
      <path
        d="M8.4 0.45 16.4 4.41V9.51C16.4 13.48 12.97 16.31 8.4 17.45 3.83 16.31 0.4 13.48 0.4 9.51V4.41Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="fill-transparent transition-colors duration-300 group-hover:fill-current"
      />
    </svg>
  )
}
