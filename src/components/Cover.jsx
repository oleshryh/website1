// A cover picture in a rounded frame. Photos fill the frame; cut-out pictures
// (the soldier, the product renders) sit whole on the light paper.
export default function Cover({ src, fit = 'cover', className = '', hover = false }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-paper ${className}`}>
      <img
        src={src}
        alt=""
        loading="lazy"
        className={`h-full w-full transition-transform duration-700 ease-out ${
          fit === 'cover' ? 'object-cover' : 'object-contain p-6'
        } ${hover ? 'group-hover:scale-[1.04]' : ''}`}
      />
    </div>
  )
}
