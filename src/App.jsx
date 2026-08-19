import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import About from './components/About'
import Header from './components/Header'
import Hero, { HeroCallouts } from './components/Hero'
import SocialRail from './components/SocialRail'
import SoldierScrollFigure from './components/SoldierScrollFigure'

function App() {
  const stageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div className="bg-canvas">
      <Header />
      <SocialRail />

      <div ref={stageRef} className="relative h-[240vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroCallouts progress={scrollYProgress} />
          <SoldierScrollFigure progress={scrollYProgress} />
          <Hero progress={scrollYProgress} />
          <About progress={scrollYProgress} />
        </div>
      </div>
    </div>
  )
}

export default App
