import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Music, Film } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
}

const hobbies = [
  { icon: Film, label: 'Watching Movies', desc: 'Sci-fi and thriller enthusiast' },
  { icon: Music, label: 'Listening to Music', desc: 'All genres, all moods' },
];

export default function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    Promise.all([
      fetch('/api/certifications').then(r => r.json()),
      fetch('/api/achievements').then(r => r.json()),
    ])
      .then(([c, a]) => { setCerts(c); setAchievements(a); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-neon-blue tracking-widest uppercase">Certifications & More</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-text-primary">
            Awards & <span className="gradient-text">Recognition</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="glass-card rounded-2xl p-8 animate-pulse">
                <div className="h-6 w-40 bg-bg-glass rounded mb-4" />
                <div className="h-4 w-32 bg-bg-glass rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Certs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card neon-border rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                  <Award size={20} className="text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certs.map(cert => (
                  <div key={cert.id} className="p-4 rounded-xl bg-bg-glass border border-border-glass hover:border-neon-blue/20 transition-all">
                    <p className="text-text-primary font-medium text-sm">{cert.title}</p>
                    <p className="text-text-muted text-xs mt-1">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card neon-border rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green/20 to-emerald-500/20 flex items-center justify-center">
                  <Trophy size={20} className="text-neon-green" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Achievements</h3>
              </div>
              <div className="space-y-4">
                {achievements.map(ach => (
                  <div key={ach.id} className="p-4 rounded-xl bg-bg-glass border border-border-glass hover:border-neon-green/20 transition-all">
                    <p className="text-text-primary font-medium text-sm">{ach.title}</p>
                    <p className="text-text-muted text-xs mt-1">{ach.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hobbies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card neon-border rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink/20 to-rose-500/20 flex items-center justify-center">
                  <Music size={20} className="text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Hobbies</h3>
              </div>
              <div className="space-y-4">
                {hobbies.map(hobby => (
                  <div key={hobby.label} className="p-4 rounded-xl bg-bg-glass border border-border-glass hover:border-neon-pink/20 transition-all flex items-center gap-4">
                    <hobby.icon size={20} className="text-neon-pink shrink-0" />
                    <div>
                      <p className="text-text-primary font-medium text-sm">{hobby.label}</p>
                      <p className="text-text-muted text-xs mt-0.5">{hobby.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
