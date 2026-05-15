import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ChevronDown, Code2, Sparkles } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo('.parallax-layer', 'x', { duration: 1, ease: 'power2.out' })
      const yTo = gsap.quickTo('.parallax-layer', 'y', { duration: 1, ease: 'power2.out' })

      // Parallax effect on mouse move
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 20
        const yPos = (clientY / window.innerHeight - 0.5) * 20

        xTo(xPos)
        yTo(yPos)
      }

      window.addEventListener('mousemove', handleMouseMove)

      // Entrance animations
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      })

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      })

      gsap.from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
      })

      gsap.from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2,
      })

      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Orbs */}
      <div className="parallax-layer absolute top-20 left-10 w-72 h-72 bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="parallax-layer absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="parallax-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[150px]" />

      {/* Floating 3D Shapes */}
      <div className="parallax-layer absolute top-32 right-[15%] hidden lg:block">
        <motion.div
          animate={{ rotateY: 360, rotateX: 20 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 border border-neon-blue/30 rounded-xl glass flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Code2 className="text-neon-blue/60" size={32} />
        </motion.div>
      </div>

      <div className="parallax-layer absolute bottom-32 left-[10%] hidden lg:block">
        <motion.div
          animate={{ rotateY: -360, rotateZ: 10 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 border border-neon-purple/30 rounded-full glass flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Sparkles className="text-neon-purple/60" size={28} />
        </motion.div>
      </div>

      <div className="parallax-layer absolute top-[20%] left-[20%] hidden lg:block">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Main Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">Available for freelance work</span>
        </motion.div>

        <h1 className="hero-title font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4">
          <span className="block text-white">Loukmane</span>
          <span className="block text-gradient mt-2">Bouchmar</span>
        </h1>

        <h2 className="hero-subtitle font-display text-xl sm:text-2xl md:text-3xl text-gray-400 mb-6 tracking-wide">
          Creative Developer & Future Software Engineer
        </h2>

        <p className="hero-desc text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          I build modern websites, immersive UI experiences, interactive apps, and creative digital projects using modern web technologies.
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-white text-dark-bg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] interactive"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Projects
            </span>
          </a>

          <a
            href="#contact"
            className="px-8 py-4 glass rounded-full text-white font-medium hover:border-neon-blue/50 transition-all duration-300 interactive"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-neon-blue" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
