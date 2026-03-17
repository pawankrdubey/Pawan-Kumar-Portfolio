import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ChevronRight } from 'lucide-react';

const titles = [
  'Computer Science Engineer',
  'Java Developer',
  'Web Developer',
  'Problem Solver',
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 60);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 30);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((titleIndex + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/3 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card neon-border mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm text-text-secondary">Available for opportunities</span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight mb-6"
        >
          <span className="text-text-primary">Hi, I'm </span>
          <span className="gradient-text">Pawan Kumar</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-10 sm:h-12 mb-8 flex items-center justify-center"
        >
          <span className="text-xl sm:text-2xl font-mono text-neon-blue">
            {'< '}
            <span className="text-text-primary">{titles[titleIndex].substring(0, charIndex)}</span>
            <span className="animate-pulse text-neon-blue">|</span>
            {' />'}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Motivated Computer Science undergraduate with strong skills in Java and web development. Passionate about building real-world applications and continuously learning new technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/25 hover:scale-105"
          >
            View Projects
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-card neon-border text-text-primary font-semibold text-lg transition-all duration-300 hover:scale-105"
          >
            <Download size={20} />
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
