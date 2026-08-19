import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import Header from './components/Header'
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

      <div ref={stageRef} className="relative h-[240vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SoldierScrollFigure progress={scrollYProgress} />
        </div>
      </div>
    </div>
  )
}

export default App
