import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  features: string;
  image_url: string;
  live_url: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => { setProjects(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-neon-blue tracking-widest uppercase">Projects</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-text-primary">
            Featured <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1,2].map(i => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-56 bg-bg-glass" />
                <div className="p-8 space-y-4">
                  <div className="h-6 w-48 bg-bg-glass rounded" />
                  <div className="h-4 w-full bg-bg-glass rounded" />
                  <div className="h-4 w-3/4 bg-bg-glass rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="glass-card neon-border rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-neon-blue/10 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-neon-blue/10 to-neon-purple/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layers size={64} className="text-neon-blue/20" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex gap-2 flex-wrap">
                      {project.tech.split(',').map(t => (
                        <span key={t.trim()} className="px-3 py-1 rounded-full text-xs font-mono bg-neon-blue/20 text-neon-blue border border-neon-blue/20">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-text-muted text-sm mb-6">
                    <span className="text-text-secondary font-medium">Features:</span> {project.features}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={project.live_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium text-sm hover:shadow-lg hover:shadow-neon-blue/25 transition-all hover:scale-105"
                    >
                      <ExternalLink size={16} />
                      View Project
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card border border-border-glass text-text-secondary font-medium text-sm hover:text-text-primary transition-all hover:scale-105"
                    >
                      <Github size={16} />
                      Source
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
