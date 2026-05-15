import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'React', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'GSAP', level: 80 },
      { name: 'Three.js', level: 75 },
    ],
  },
  {
    title: 'Backend / Programming',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Git', level: 80 },
      { name: 'GitHub', level: 85 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 70 },
      { name: 'Vercel', level: 88 },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-category', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })

      // Animate progress bars
      const bars = document.querySelectorAll('.progress-bar')
      bars.forEach((bar) => {
        const width = bar.dataset.width
        gsap.to(bar, {
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          width: `${width}%`,
          duration: 1.2,
          ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-neon-purple text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Expertise
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-category glass rounded-3xl p-8 glow-border">
              <h3 className="font-display text-xl font-semibold mb-8 text-white">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">{skill.name}</span>
                      <span className="text-sm text-neon-blue">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                        data-width={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tech Pills */}
        <div className="mt-20 flex flex-wrap justify-center gap-3">
          {['React', 'Three.js', 'GSAP', 'Tailwind', 'Python', 'Git', 'Figma', 'Vercel'].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-4 py-2 glass rounded-full text-sm text-gray-300 hover:text-white hover:border-neon-blue/50 transition-all duration-300 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
