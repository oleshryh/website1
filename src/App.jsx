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
import { STAGE_STOPS, STAGE_VH } from './components/stage'
import useScrollAutoAdvance from './components/useScrollAutoAdvance'
import useViewport from './components/useViewport'

// Below this width the first two screens are the phone layout: still pictures
// and ordinary scrolling instead of the animated stage.
const PHONE_MAX = 767

// Header and the first two screens on a computer or tablet.
function StageIntro() {
  const stageRef = useRef(null)
  // 0 on the first screen, 1 on the second: the soldier's clip and both
  // screens' fades all read this one value.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  useScrollAutoAdvance(stageRef, STAGE_STOPS)

  return (
    <>
      <Header progress={scrollYProgress} />

      {/* The first two screens are one pinned viewport that the scroll plays
          through; after the second the page scrolls on normally. */}
      <div ref={stageRef} className="relative" style={{ height: `${STAGE_VH}svh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-canvas">
          <HeroCallouts progress={scrollYProgress} />
          <Hero progress={scrollYProgress} />
          <About progress={scrollYProgress} />
          <SoldierScrollFigure progress={scrollYProgress} />
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
