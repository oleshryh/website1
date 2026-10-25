import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import About from './components/About'
import Clients from './components/Clients'
import Header from './components/Header'
import Hero, { HeroCallouts } from './components/Hero'
import Products from './components/Products'
import Reticle from './components/Reticle'
import SocialRail from './components/SocialRail'
import SoldierScrollFigure from './components/SoldierScrollFigure'
import TrustedBy from './components/TrustedBy'
import { STAGE_STOPS, STAGE_VH } from './components/stage'
import useScrollAutoAdvance from './components/useScrollAutoAdvance'

// Every "talk to sales" on the page leads to the closing block.
function goToContact() {
  document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })
}

function App() {
  const stageRef = useRef(null)
  // 0 on the first screen, 1 on the second: the soldier's clip and both
  // screens' fades all read this one value.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  useScrollAutoAdvance(stageRef, STAGE_STOPS)

  return (
    <div className="bg-canvas">
      <Header progress={scrollYProgress} onContact={goToContact} />
      <Reticle />

      {/* The first two screens are one pinned viewport that the scroll plays
          through; after the second the page scrolls on normally. */}
      <div ref={stageRef} className="relative" style={{ height: `${STAGE_VH}svh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-canvas">
          <HeroCallouts progress={scrollYProgress} />
          <Hero progress={scrollYProgress} onContact={goToContact} />
          <About progress={scrollYProgress} />
          <SoldierScrollFigure progress={scrollYProgress} />
          <SocialRail />
        </div>
      </div>

      <Products />
      <TrustedBy />
      <Clients />
    </div>
  )
}

export default App
