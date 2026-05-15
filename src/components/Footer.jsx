import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 border-t border-dark-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © 2024 Loukmane Bouchmar. All rights reserved.
        </p>

        <p className="text-gray-500 text-sm flex items-center gap-1">
          Built with <Heart size={14} className="text-neon-purple fill-neon-purple" /> in Morocco
        </p>
      </div>
    </footer>
  )
}
