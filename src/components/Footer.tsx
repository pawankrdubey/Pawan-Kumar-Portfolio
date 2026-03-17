import { Code2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border-glass bg-bg-primary/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="text-text-primary font-bold">Pawan Kumar</span>
          </div>

          <p className="text-text-muted text-sm flex items-center gap-1">
            © {new Date().getFullYear()} — Made with <Heart size={14} className="text-neon-pink" /> by Pawan Kumar
          </p>

          <div className="flex gap-6">
            {['Home', 'About', 'Projects', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-text-muted text-sm hover:text-neon-blue transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
