import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, BookOpen, Smile } from 'lucide-react';

const highlights = [
  { icon: Zap, label: 'Quick Learner', desc: 'Rapidly adapts to new technologies and frameworks' },
  { icon: BookOpen, label: 'Strong Fundamentals', desc: 'Deep understanding of OOPS & Data Structures' },
  { icon: Smile, label: 'Positive Attitude', desc: 'Team player with excellent communication skills' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-neon-blue tracking-widest uppercase">About Me</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-text-primary">
            Know Who <span className="gradient-text">I Am</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card neon-border rounded-2xl p-8">
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                I am a <span className="text-neon-blue font-semibold">B.Tech Computer Science</span> student at IES University with a CGPA of <span className="text-neon-green font-semibold">8.7</span>. I have hands-on experience in building web applications like weather apps and trading platform UI clones.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                I enjoy solving problems and learning new technologies. My goal is to become a proficient software developer who creates impactful solutions that make a difference.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Java', 'Web Dev', 'DSA', 'Problem Solving'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="glass-card neon-border rounded-2xl p-6 flex items-start gap-5 group hover:bg-neon-blue/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center shrink-0 group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all">
                  <item.icon size={22} className="text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{item.label}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
