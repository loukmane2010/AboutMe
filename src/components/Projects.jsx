import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, Activity, Terminal, Calculator, AppWindow, Shield, Box } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'NetProbe',
    description: 'Professional Network Analysis Tool featuring device discovery, DNS tools, port scanning, and report exporting. Includes a standalone Windows executable.',
    tech: ['Python', 'Networking'],
    icon: Activity,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    link: '#',
    github: 'https://github.com/loukmane2010/NetProbe',
  },
  {
    id: 2,
    title: 'PyLogger',
    description: 'A Python-based keylogger and system monitoring tool. Designed for educational purposes and system administration.',
    tech: ['Python'],
    icon: Terminal,
    color: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    link: '#',
    github: 'https://github.com/loukmane2010/PyLogger',
  },
  {
    id: 3,
    title: 'Scientific Calculator',
    description: 'A multi-themed, responsive web-based scientific calculator featuring advanced mathematical functions, an interactive mode toggle, and fluid mobile design.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    icon: Calculator,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    link: 'https://loukmane2010.github.io/Scientific-Calculator/',
    github: 'https://github.com/loukmane2010/Calculator',
  },
  {
    id: 4,
    title: 'Shift-End',
    description: 'A cross-platform Windows utility application. Configured with PyInstaller for seamless execution. (Executable download coming soon!)',
    tech: ['Python', 'PyInstaller'],
    icon: Box,
    color: 'from-neon-blue/20 to-neon-purple/20',
    borderColor: 'border-neon-blue/30',
    link: '#',
    github: 'https://github.com/loukmane2010/shift-end',
  }
]

export default function Projects() {
  const sectionRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [notification, setNotification] = useState(null)

  const handleLinkClick = (e, url) => {
    if (url === '#' || !url) {
      e.preventDefault()
      setNotification('This link is coming soon! 🚀')
      setTimeout(() => setNotification(null), 3000)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-neon-blue text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Portfolio
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card relative group"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`relative glass rounded-3xl p-8 overflow-hidden glow-border interactive ${project.borderColor}`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                      <project.icon className="text-white" size={28} />
                    </div>
                    <div className="flex gap-3">
                      <a href={project.github} onClick={(e) => handleLinkClick(e, project.github)} className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
                        <Github size={18} className="text-gray-400 hover:text-white" />
                      </a>
                      <a href={project.link} onClick={(e) => handleLinkClick(e, project.link)} className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
                        <ExternalLink size={18} className="text-gray-400 hover:text-white" />
                      </a>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-3 text-white group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs glass rounded-full text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-neon-blue to-neon-purple rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 glass-strong px-6 py-3 rounded-full flex items-center gap-3 border border-neon-blue/30 shadow-[0_0_30px_rgba(0,212,255,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <span className="text-white text-sm font-medium">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
