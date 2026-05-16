import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Mail, Send, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-white' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@loukmane.dev', color: 'hover:text-neon-blue' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert('Message sent! (Demo)')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto contact-content relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-neon-blue text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Get in Touch
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 glow-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Your Name"
                  className="w-full bg-dark-card border border-dark-border rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                  required
                />
                <div className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 ${focused === 'name' ? 'w-full' : 'w-0'}`} />
              </div>

              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="Your Email"
                  className="w-full bg-dark-card border border-dark-border rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                  required
                />
                <div className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 ${focused === 'email' ? 'w-full' : 'w-0'}`} />
              </div>
            </div>

            <div className="relative">
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                placeholder="Your Message"
                rows={5}
                className="w-full bg-dark-card border border-dark-border rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors resize-none"
                required
              />
              <div className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 ${focused === 'message' ? 'w-full' : 'w-0'}`} />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-shadow duration-300 interactive"
            >
              <Send size={18} />
              Send Message
            </motion.button>
          </form>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center gap-6">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.1 }}
              className={`w-14 h-14 glass rounded-2xl flex items-center justify-center text-gray-400 ${social.color} transition-colors duration-300 interactive`}
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
