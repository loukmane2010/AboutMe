import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, Cloud, Box, Lock, User } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Modern Weather App',
    description: 'Auto-detect user location with 5-day forecast, animated weather backgrounds, dark/light mode, interactive UI, loading animations, and map integration.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
    icon: Cloud,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Interactive 3D Website',
    description: 'Immersive 3D animations with smooth scrolling, interactive objects, cinematic transitions, and futuristic UI design.',
    tech: ['Three.js', 'GSAP', 'JavaScript'],
    icon: Box,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Password Generator App',
    description: 'Secure password generation with customizable settings, copy-to-clipboard functionality, and a clean modern UI.',
    tech: ['Python', 'JavaScript'],
    icon: Lock,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Personal Portfolio Website',
    description: 'Advanced animations, responsive design, glassmorphism UI, and modern interactions for a premium personal brand.',
    tech: ['React', 'Tailwind CSS', 'GSAP'],
    icon: User,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    link: '#',
    github: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)

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
                      <a href={project.github} className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
                        <Github size={18} className="text-gray-400 hover:text-white" />
                      </a>
                      <a href={project.link} className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
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
    </section>
  )
}
