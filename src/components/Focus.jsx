import React from 'react';
import { motion } from 'framer-motion';
import { Server, Brain, Cloud, Code, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Focus() {
  const cards = [
    {
      title: "Backend Engineering",
      icon: <Server size={22} className="focus-card-icon" />,
      description: "Designing robust, layered REST APIs, secure authentication systems, and database query optimizations.",
      items: [
        { name: "Node.js", isNew: false },
        { name: "Express.js", isNew: false },
        { name: "Fastify", isNew: true },
        { name: "Appwrite", isNew: true },
        { name: "REST APIs", isNew: false },
        { name: "MongoDB", isNew: false },
        { name: "PostgreSQL", isNew: false },
        { name: "Redis", isNew: true }
      ]
    },
    {
      title: "Generative AI",
      icon: <Brain size={22} className="focus-card-icon" />,
      description: "Building intelligent applications, RAG pipelines, and integrating state-of-the-art LLM architectures.",
      items: [
        { name: "GenAI", isNew: true },
        { name: "LLMs", isNew: true },
        { name: "AI APIs", isNew: false },
        { name: "Prompt Engineering", isNew: false },
        { name: "RAG", isNew: false },
        { name: "AI Agents", isNew: false }
      ]
    },
    {
      title: "Cloud & Infrastructure",
      icon: <Cloud size={22} className="focus-card-icon" />,
      description: "Containerizing services, deploying cloud solutions, and maintaining consistent CI/CD workflows.",
      items: [
        { name: "Docker", isNew: true },
        { name: "AWS", isNew: true },
        { name: "Git", isNew: false },
        { name: "GitHub", isNew: false }
      ]
    },
    {
      title: "Problem Solving",
      icon: <Code size={22} className="focus-card-icon" />,
      description: "Practicing data structures, algorithmic complexity, and analytical problem-solving patterns.",
      items: [
        { name: "C++", isNew: false },
        { name: "DSA", isNew: false },
        { name: "LeetCode", isNew: false }
      ]
    }
  ];

  return (
    <section id="focus" className="focus-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Focus Areas</span>
            <h2 className="section-title">Currently building</h2>
            <p className="section-desc">
              Core domains I actively develop in, expanding with modern cloud infrastructure and LLM engineering.
            </p>
          </div>

          <div className="focus-grid">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <TiltCard maxTilt={8} scale={1.02} className="h-full">
                  <div className="focus-card card h-full">
                    <div className="focus-card-header">
                      <div className="focus-icon-box">{card.icon}</div>
                      <h3 className="focus-card-title">{card.title}</h3>
                    </div>

                    <p className="focus-card-desc">{card.description}</p>

                    <div className="focus-pill-list">
                      {card.items.map((tech) => (
                        <span
                          key={tech.name}
                          className={`focus-pill ${tech.isNew ? 'focus-pill-new' : ''}`}
                        >
                          {tech.name}
                          {tech.isNew && (
                            <span className="pill-new-tag">
                              <Sparkles size={10} />
                              <span>New</span>
                            </span>
                          )}
                        </span>
                      ))}
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
