import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Rocket, Code, Sparkles, Lightbulb } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    year: '2021',
    title: 'Started the Journey',
    description: 'Started learning programming and web development. Discovered the magic of turning ideas into digital reality.',
    icon: Rocket,
  },
  {
    year: '2022',
    title: 'Building Projects',
    description: 'Built multiple frontend and Python projects. From simple websites to interactive applications.',
    icon: Code,
  },
  {
    year: '2023',
    title: 'Advanced Animation',
    description: 'Learning advanced animation and 3D web development with GSAP, Three.js, and modern CSS techniques.',
    icon: Sparkles,
  },
  {
    year: '2024',
    title: 'Creative Coding',
    description: 'Exploring creative coding and immersive experiences. Pushing the boundaries of what the web can do.',
    icon: Lightbulb,
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: 'top center',
      })

      // Animate items
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-neon-cyan text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Journey
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
            My <span className="text-gradient">Experience</span>
          </h2>
        </div>

        <div className="relative">
          {/* Glowing Timeline Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-transparent"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-neon-blue rounded-full blur-sm" />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.year}
                className={`timeline-item relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass glow-border rounded-2xl p-6 interactive inline-block text-left"
                  >
                    <span className="text-neon-blue font-display text-lg font-bold mb-2 block">
                      {exp.year}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-bg border-2 border-neon-blue flex items-center justify-center z-10">
                  <exp.icon size={14} className="text-neon-blue" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
