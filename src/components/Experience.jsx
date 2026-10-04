import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2, MapPin, Calendar, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Experience() {
  const experiences = [
    {
      company: "Indian Institute of Information Technology Guwahati (IIITG)",
      role: "Graduate Researcher & AI Scholar",
      status: "Current",
      isCurrent: true,
      duration: "2026 — Present",
      location: "Guwahati, India",
      logo: "/college/iiitg_logo.png",
      description: "Pursuing M.Tech in ECE (Artificial Intelligence), conducting advanced coursework and engineering research in machine learning, embedded architectures, and intelligent software systems.",
      highlights: [
        "Advanced research in Artificial Intelligence algorithms and neural architectures",
        "Developing AI-driven educational applications and computational research models"
      ]
    },
    {
      company: "Resorcio Community",
      role: "Tech Team Member",
      status: "Contributor",
      isCurrent: false,
      duration: "May 2024 — June 2025",
      location: "Kolkata, West Bengal",
      description: "Worked as a core Tech Team Member contributing to backend projects and managing the technical LinkedIn presence for the Resorcio Community.",
      highlights: [
        "Engineered and maintained backend services and APIs for community projects",
        "Managed technical communications and developer outreach on LinkedIn for the Resorcio Community",
        "Collaborated with team members to deliver reliable software solutions and backend workflows"
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Career Journey</span>
            <h2 className="section-title">Experience & Research</h2>
            <p className="section-desc">
              Software engineering experience and graduate research in backend systems and artificial intelligence.
            </p>
          </div>

          <div className="experience-timeline">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
              >
                <TiltCard maxTilt={6} scale={1.015}>
                  <div className={`experience-card card ${exp.isCurrent ? 'experience-card-current' : ''}`}>
                    <div className="exp-header">
                      <div className="exp-role-group">
                        <div className="exp-role-header-wrap">
                          {exp.logo && (
                            <div className="exp-logo-box" title={exp.company}>
                              <img src={exp.logo} alt={exp.company} className="exp-logo-img" loading="lazy" />
                            </div>
                          )}
                          <div>
                            <h3 className="exp-role">{exp.role}</h3>
                            <div className="exp-company-row">
                              <Building2 size={15} />
                              <span className="exp-company">{exp.company}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="exp-meta-group">
                        {exp.isCurrent ? (
                          <span className="badge badge-success">
                            <span className="status-dot"></span>
                            <span>Current</span>
                          </span>
                        ) : (
                          <span className="badge">
                            <Calendar size={12} />
                            <span>{exp.duration}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="exp-desc">{exp.description}</p>

                    {exp.highlights && (
                      <ul className="exp-points-list">
                        {exp.highlights.map((point, i) => (
                          <li key={i} className="exp-point-item">
                            <span className="exp-point-bullet">›</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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
