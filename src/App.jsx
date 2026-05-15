import React, { useEffect, useRef, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

const ParticleBackground = React.lazy(() => import('./components/ParticleBackground'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" })
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" })
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" })
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" })

    const moveCursor = (e) => {
      xToCursor(e.clientX - 10)
      yToCursor(e.clientY - 10)
      xToDot(e.clientX - 2)
      yToDot(e.clientY - 2)
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, borderColor: '#a855f7', duration: 0.2 })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, borderColor: '#00d4ff', duration: 0.2 })
    }

    window.addEventListener('mousemove', moveCursor)

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .interactive')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {/* Custom Cursor - Desktop Only */}
      <div className="hidden lg:block">
        <div ref={cursorRef} className="custom-cursor" />
        <div ref={cursorDotRef} className="cursor-dot" />
      </div>

      {/* Three.js Particle Background */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
