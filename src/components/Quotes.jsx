import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Flame, Terminal, Compass, Sparkles, Target, Zap, Bot } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Quotes() {
  const visualQuotes = [
    {
      id: 1,
      quote: "NOTHING WAS GIVEN. EVERYTHING EARNED.",
      subquote: "Every milestone, every line of code, and every ranking is forged through discipline and relentless practice.",
      author: "Charles Leclerc",
      role: "Scuderia Ferrari",
      tag: "Relentless Grit",
      image: "/quotes/earned.jpg",
      accent: "red",
      icon: <Flame size={16} className="text-red-400" />
    },
    {
      id: 2,
      quote: "I'M COMING FOR EVERYTHING I PROMISED MYSELF.",
      subquote: "No shortcuts, no excuses. Building scalable systems, mastering deep AI architectures, and reaching the top.",
      author: "Unstoppable Ambition",
      role: "Core Mindset",
      tag: "Self-Discipline",
      image: "/quotes/promised_clean.jpg",
      accent: "cyan",
      icon: <Target size={16} className="text-cyan-400" />
    }
  ];

  const engineeringQuotes = [
    {
      id: 3,
      quote: "Talk is cheap. Show me the code.",
      author: "Linus Torvalds",
      context: "Creator of Linux & Git",
      tag: "Engineering Truth",
      icon: <Terminal size={18} />
    },
    {
      id: 4,
      quote: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
      context: "Problem Solving Principle",
      tag: "System Thinking",
      icon: <Zap size={18} />
    },
    {
      id: 5,
      quote: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
      author: "Alan Turing",
      context: "Father of Computing & Artificial Intelligence",
      tag: "AI & Future",
      icon: <Bot size={18} />
    },
    {
      id: 6,
      quote: "Stay hungry, stay foolish.",
      author: "Steve Jobs",
      context: "Whole Earth Catalog & Stanford '05",
      tag: "Curiosity & Hunger",
      icon: <Compass size={18} />
    },
    {
      id: 7,
      quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Will Durant",
      context: "On Aristotle's Philosophy",
      tag: "Consistency",
      icon: <Sparkles size={18} />
    }
  ];

  return (
    <section id="quotes" className="quotes-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Philosophy & Drive</span>
            <h2 className="section-title">Favorite Quotes</h2>
            <p className="section-desc">
              Words and mindsets that fuel late-night builds, algorithmic grit, and relentless engineering.
            </p>
          </div>

          {/* Featured Visual Poster Quotes (From User) */}
          <div className="quotes-visual-grid">
            {visualQuotes.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <TiltCard maxTilt={6} scale={1.015} className="h-full">
                  <div className={`quote-poster-card card quote-card-${item.accent}`}>
                    <div className="quote-poster-image-box">
                      <img
                        src={item.image}
                        alt={item.quote}
                        className="quote-poster-img"
                        loading="lazy"
                      />
                      <div className="quote-poster-overlay"></div>
                    </div>

                    <div className="quote-poster-content">
                      <div className="quote-badge-row">
                        <span className="quote-tag-pill">
                          {item.icon}
                          <span>{item.tag}</span>
                        </span>
                        <Quote size={20} className="quote-mark-icon" />
                      </div>

                      <h3 className="quote-poster-text">
                        "{item.quote}"
                      </h3>

                      <p className="quote-poster-sub">
                        {item.subquote}
                      </p>

                      <div className="quote-poster-footer">
                        <div className="quote-author-info">
                          <span className="quote-author-name">{item.author}</span>
                          <span className="quote-author-role">{item.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Complementary Engineering Quotes Grid */}
          <div className="quotes-text-grid">
            {engineeringQuotes.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <TiltCard maxTilt={8} scale={1.02} className="h-full">
                  <div className="quote-text-card card h-full">
                    <div className="quote-text-header">
                      <span className="quote-text-icon">{item.icon}</span>
                      <span className="badge badge-accent quote-text-badge">{item.tag}</span>
                    </div>

                    <p className="quote-text-body">
                      "{item.quote}"
                    </p>

                    <div className="quote-text-footer">
                      <span className="quote-text-author">{item.author}</span>
                      <span className="quote-text-context">{item.context}</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
