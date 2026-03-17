import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
  grade: string;
}

export default function Education() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/education')
      .then(r => r.json())
      .then(d => { setEducation(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="education" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/[0.02] to-transparent" />
      <div className="max-w-4xl mx-auto px-6 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-neon-blue tracking-widest uppercase">Education</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-text-primary">
            Academic <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="space-y-8">
            {[1,2,3].map(i => (
              <div key={i} className="glass-card rounded-2xl p-8 animate-pulse">
                <div className="h-6 w-64 bg-bg-glass rounded mb-4" />
                <div className="h-4 w-48 bg-bg-glass rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink hidden sm:block" />

            <div className="space-y-8">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="relative sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-8 w-5 h-5 rounded-full bg-bg-primary border-2 border-neon-blue shadow-lg shadow-neon-blue/30 hidden sm:block" />

                  <div className="glass-card neon-border rounded-2xl p-8 hover:bg-neon-blue/5 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center sm:hidden">
                          <GraduationCap size={20} className="text-neon-blue" />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">{edu.degree}</h3>
                      </div>
                      <span className="px-4 py-1.5 rounded-full text-xs font-mono bg-neon-blue/10 text-neon-blue border border-neon-blue/20 w-fit">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-text-secondary mb-2">{edu.institution}</p>
                    <p className="text-neon-green font-semibold">{edu.grade}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
