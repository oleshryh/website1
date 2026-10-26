import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import About from './components/About'
import Clients from './components/Clients'
import Details from './components/Details'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero, { HeroCallouts } from './components/Hero'
import MobileIntro from './components/MobileIntro'
import Products from './components/Products'
import Reticle from './components/Reticle'
import SocialRail from './components/SocialRail'
import SoldierScrollFigure from './components/SoldierScrollFigure'
import TrustedBy from './components/TrustedBy'
import { STAGE_VH } from './components/stage'
import useStageTurn from './components/useStageTurn'
import useViewport from './components/useViewport'

// Below this width the first two screens are the phone layout: still pictures
// and ordinary scrolling instead of the animated stage.
const PHONE_MAX = 767

// Header and the first two screens on a computer or tablet.
function StageIntro() {
  const stageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })
  // 0 on the first screen, 1 on the second: the soldier's clip and both
  // screens' fades all read this one value, which plays out in time once the
  // scroll has asked for a screen.
  const turn = useStageTurn(scrollYProgress)

  return (
    <>
      <Header progress={turn} />

      {/* The first two screens are one pinned viewport; the scroll is never
          held — past the pinned stretch the page carries on normally. */}
      <div ref={stageRef} className="relative" style={{ height: `${STAGE_VH}svh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-canvas">
          <HeroCallouts progress={turn} />
          <Hero progress={turn} />
          <About progress={turn} />
          <SoldierScrollFigure progress={turn} />
          <SocialRail />
        </div>
      </div>
    </>
  )
}

function App() {
  const { w } = useViewport()

  return (
    <div className="bg-canvas">
      <Reticle />
      {w <= PHONE_MAX ? (
        <>
          <Header />
          <MobileIntro />
        </>
      ) : (
        <StageIntro />
      )}

      <Products />
      <TrustedBy />
      <Clients />
      <Details />
      <Footer />
    </div>
  )
}

export default App
