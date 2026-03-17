import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  id: number;
  category: string;
  name: string;
  proficiency: number;
}

const categoryColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  'Languages': { bg: 'bg-neon-blue/10', text: 'text-neon-blue', border: 'border-neon-blue/20', glow: 'shadow-neon-blue/10' },
  'Web Technologies': { bg: 'bg-neon-purple/10', text: 'text-neon-purple', border: 'border-neon-purple/20', glow: 'shadow-neon-purple/10' },
  'Tools': { bg: 'bg-neon-green/10', text: 'text-neon-green', border: 'border-neon-green/20', glow: 'shadow-neon-green/10' },
  'Core Subjects': { bg: 'bg-neon-pink/10', text: 'text-neon-pink', border: 'border-neon-pink/20', glow: 'shadow-neon-pink/10' },
};

const barColors: Record<string, string> = {
  'Languages': 'from-neon-blue to-cyan-400',
  'Web Technologies': 'from-neon-purple to-violet-400',
  'Tools': 'from-neon-green to-emerald-400',
  'Core Subjects': 'from-neon-pink to-rose-400',
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/skills')
      .then(r => r.json())
      .then(d => { setSkills(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/[0.02] to-transparent" />
      <div className="max-w-6xl mx-auto px-6 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-neon-blue tracking-widest uppercase">Skills</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-text-primary">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="glass-card rounded-2xl p-8 animate-pulse">
                <div className="h-6 w-40 bg-bg-glass rounded mb-6" />
                <div className="space-y-4">
                  <div className="h-4 w-full bg-bg-glass rounded" />
                  <div className="h-4 w-3/4 bg-bg-glass rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(grouped).map(([category, items], catIdx) => {
              const colors = categoryColors[category] || categoryColors['Languages'];
              const barColor = barColors[category] || barColors['Languages'];
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: catIdx * 0.15 }}
                  className={`glass-card rounded-2xl p-8 border ${colors.border} hover:shadow-lg ${colors.glow} transition-all duration-500`}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-3 h-3 rounded-full ${colors.bg} ${colors.text}`} style={{ backgroundColor: 'currentColor' }} />
                    <h3 className={`text-xl font-bold ${colors.text}`}>{category}</h3>
                  </div>
                  <div className="space-y-5">
                    {items.map((skill, idx) => (
                      <div key={skill.id}>
                        <div className="flex justify-between mb-2">
                          <span className="text-text-primary font-medium text-sm">{skill.name}</span>
                          <span className={`text-xs font-mono ${colors.text}`}>{skill.proficiency}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-bg-glass overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                            transition={{ duration: 1, delay: catIdx * 0.15 + idx * 0.1, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
