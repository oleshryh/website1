import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import About from './components/About'
import ContactScreen from './components/ContactScreen'
import Header from './components/Header'
import Hero, { HeroCallouts } from './components/Hero'
import Products from './components/Products'
import Reticle from './components/Reticle'
import SocialRail from './components/SocialRail'
import SoldierScrollFigure from './components/SoldierScrollFigure'
import {
  CLIP_HANDOVER,
  CONTACT_STOP,
  PANEL_VH,
  SCREEN_2,
  SCREEN_3,
  STAGE_STOPS,
  STAGE_VH,
} from './components/stage'
import useScrollAutoAdvance from './components/useScrollAutoAdvance'
import useSegmentProgress from './components/useSegmentProgress'

function App() {
  const stageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  // Each screen reads its own 0..1, so its thresholds mean what they did when
  // it was the only thing on the stage.
  const sceneA = useSegmentProgress(scrollYProgress, [0, SCREEN_2])
  const sceneB = useSegmentProgress(scrollYProgress, [SCREEN_2, SCREEN_3])
  const sceneC = useSegmentProgress(scrollYProgress, [SCREEN_3, 1])
  // The figure's two clips each run across their own stretch of the page.
  const mainPhase = useSegmentProgress(scrollYProgress, [0, CLIP_HANDOVER])

  const goToStop = useScrollAutoAdvance(stageRef, STAGE_STOPS)

  return (
    // The whole site sits on one light ground. The screens so far are a panel
    // laid on top of it, and the last screen slides that panel up off its own
    // rounded bottom edge to show the contact screen that was always behind.
    <div className="bg-canvas">
      <Header progress={sceneA} onContact={() => goToStop.current?.(CONTACT_STOP)} />
      <SocialRail exit={sceneB} />
      <ContactScreen progress={sceneC} />
      <Reticle />

      {/* The stage is the scroll driver; the panel column inside it is shorter
          by exactly one viewport, which is the room the panel needs to slide up
          and off the screen at the end. */}
      <div ref={stageRef} className="relative z-10" style={{ height: `${STAGE_VH}svh` }}>
        <div style={{ height: `${PANEL_VH}svh` }}>
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden rounded-b-[28px] bg-canvas lg:rounded-b-[44px]">
            <HeroCallouts progress={sceneA} />
            <Hero progress={sceneA} exit={sceneB} onContact={() => goToStop.current?.(CONTACT_STOP)} />
            <About progress={sceneA} exit={sceneB} />
            <Products progress={sceneB} />
          </div>
        </div>
      </div>

      <SoldierScrollFigure
        mainPhase={mainPhase}
        turnPhase={sceneC}
        phaseA={sceneA}
        phaseB={sceneB}
      />
    </div>
  )
}

export default App
