import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'p.k.dubey199660@gmail.com', href: 'mailto:p.k.dubey199660@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91-8874861316', href: 'tel:+918874861316' },
    { icon: MapPin, label: 'Location', value: 'Bhopal, Madhya Pradesh, India', href: '#' },
  ];

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/' },
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/[0.02] to-transparent" />
      <div className="max-w-6xl mx-auto px-6 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-neon-blue tracking-widest uppercase">Contact</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-text-primary">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass-card neon-border rounded-2xl p-6 flex items-center gap-5 group hover:bg-neon-blue/5 transition-all duration-300 block"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center shrink-0 group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all">
                  <item.icon size={22} className="text-neon-blue" />
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-text-primary font-medium">{item.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4 pt-4"
            >
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass-card neon-border flex items-center justify-center text-text-secondary hover:text-neon-blue hover:bg-neon-blue/10 transition-all duration-300 hover:scale-110"
                >
                  <s.icon size={20} />
                </a>
              ))}
              <a
                href="https://www.hackerrank.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass-card neon-border flex items-center justify-center text-text-secondary hover:text-neon-green hover:bg-neon-green/10 transition-all duration-300 hover:scale-110"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8h-2V7h2v2z"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card neon-border rounded-2xl p-8 space-y-6">
              <div>
                <label className="text-text-secondary text-sm mb-2 block">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-5 py-3.5 rounded-xl bg-bg-glass border border-border-glass text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-blue/40 focus:shadow-lg focus:shadow-neon-blue/10 transition-all font-medium"
                  required
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-5 py-3.5 rounded-xl bg-bg-glass border border-border-glass text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-blue/40 focus:shadow-lg focus:shadow-neon-blue/10 transition-all font-medium"
                  required
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm mb-2 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  rows={5}
                  className="w-full px-5 py-3.5 rounded-xl bg-bg-glass border border-border-glass text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-blue/40 focus:shadow-lg focus:shadow-neon-blue/10 transition-all font-medium resize-none"
                  required
                />
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-neon-green text-sm bg-neon-green/10 px-4 py-3 rounded-xl border border-neon-green/20"
                >
                  <CheckCircle size={16} />
                  Message sent successfully!
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20"
                >
                  <AlertCircle size={16} />
                  Failed to send. Please try again.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
