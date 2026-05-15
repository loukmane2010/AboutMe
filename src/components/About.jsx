import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Palette, Terminal, Layers, Box, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const passions = [
  { icon: Globe, label: 'Futuristic Websites' },
  { icon: Palette, label: 'Modern UI/UX' },
  { icon: Terminal, label: 'Python Applications' },
  { icon: Layers, label: 'Interactive JS Projects' },
  { icon: Box, label: 'Creative Frontend' },
  { icon: Zap, label: '3D Web Interactions' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="about-text">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-neon-blue text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              About Me
            </motion.span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Passionate about creating{' '}
              <span className="text-gradient">digital experiences</span> that feel alive
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              I'm a passionate young developer focused on creating beautiful, fast, and interactive digital experiences. Based in Morocco, I combine creativity with technical expertise to build projects that stand out.
            </p>

            <p className="text-gray-500 leading-relaxed mb-10">
              My goal is to combine creativity with technology to build projects that feel alive. Every line of code is an opportunity to create something memorable.
            </p>

            <div className="glass inline-flex items-center gap-3 px-6 py-3 rounded-full">
              <span className="w-3 h-3 bg-neon-purple rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Always learning, always building</span>
            </div>
          </div>

          {/* Passion Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {passions.map((passion, index) => (
              <motion.div
                key={passion.label}
                whileHover={{ y: -5, scale: 1.02 }}
                className="about-card glass glow-border p-6 rounded-2xl group cursor-pointer interactive"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mb-4 group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all duration-300">
                  <passion.icon className="text-neon-blue" size={24} />
                </div>
                <h3 className="font-medium text-white group-hover:text-neon-blue transition-colors">
                  {passion.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
