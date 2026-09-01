import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import About from './components/About'
import Header from './components/Header'
import Hero, { HeroCallouts } from './components/Hero'
import Products from './components/Products'
import SocialRail from './components/SocialRail'
import SoldierScrollFigure from './components/SoldierScrollFigure'
import { SCENE_SPLIT, STAGE_STOPS, STAGE_VH } from './components/stage'
import useScrollAutoAdvance from './components/useScrollAutoAdvance'
import useSegmentProgress from './components/useSegmentProgress'

function App() {
  const stageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  // Screens 1-2 read their own 0..1, so every threshold in Hero, HeroCallouts
  // and About means what it did when the stage was only those two screens.
  const sceneA = useSegmentProgress(scrollYProgress, [0, SCENE_SPLIT])
  const sceneB = useSegmentProgress(scrollYProgress, [SCENE_SPLIT, 1])

  useScrollAutoAdvance(stageRef, STAGE_STOPS)

  return (
    <div className="bg-canvas">
      <Header />
      <SocialRail exit={sceneB} />

      <div ref={stageRef} className="relative" style={{ height: `${STAGE_VH}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroCallouts progress={sceneA} />
          <SoldierScrollFigure phaseA={sceneA} phaseB={sceneB} />
          <Hero progress={sceneA} exit={sceneB} />
          <About progress={sceneA} exit={sceneB} />
          <Products progress={sceneB} />
        </div>
      </div>
    </div>
  )
}

export default App
