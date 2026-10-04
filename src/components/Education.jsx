import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Education() {
  const educationList = [
    {
      institute: "Indian Institute of Information Technology Guwahati (IIITG)",
      degree: "M.Tech — ECE (Artificial Intelligence)",
      duration: "2026 — 2028",
      status: "1st Semester",
      isCurrent: true,
      focus: "Machine Learning, Embedded Systems, AI Architectures & Signal Processing",
      badge: "In Progress",
      proofLink: "https://lnkd.in/p/deTJbN2D",
      logo: "/college/iiitg_logo.png",
      logoAlt: "IIIT Guwahati Official Emblem"
    },
    {
      institute: "Academy of Technology",
      degree: "Bachelor of Technology in Electronics and Communication Engineering",
      duration: "2022 — 2026",
      status: "Graduated",
      isCurrent: false,
      focus: "Data Structures & Algorithms, OOP, Database Management Systems, SQL, Computer Networks",
      badge: "Completed",
      proofLink: null,
      logo: null
    }
  ];

  return (
    <section id="education" className="education-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Academic Background</span>
            <h2 className="section-title">Education</h2>
            <p className="section-desc">
              Strong technical foundation combining Electronics & Communication with Artificial Intelligence.
            </p>
          </div>

          <div className="education-grid">
            {educationList.map((edu, idx) => (
              <motion.div
                key={edu.institute}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
              >
                <TiltCard maxTilt={8} scale={1.02} className="h-full">
                  <div className={`education-card card h-full ${edu.isCurrent ? 'education-card-current' : ''}`}>
                    <div className="edu-card-top">
                      <div className="edu-badge-row">
                        <span className={`badge ${edu.isCurrent ? 'badge-accent' : ''}`}>
                          <Calendar size={12} />
                          <span>{edu.duration}</span>
                        </span>
                        <span className={`badge ${edu.isCurrent ? 'badge-success' : ''}`}>
                          {edu.isCurrent && <Sparkles size={11} />}
                          <span>{edu.status}</span>
                        </span>
                      </div>

                      <div className="edu-institute-row">
                        {edu.logo ? (
                          <div className="edu-logo-wrapper" title={edu.institute}>
                            <img 
                              src={edu.logo} 
                              alt={edu.logoAlt || edu.institute} 
                              className="edu-logo-img" 
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="edu-icon-wrapper">
                            <GraduationCap size={22} className="edu-icon" />
                          </div>
                        )}
                        <div className="edu-header-titles">
                          <h3 className="edu-degree">{edu.degree}</h3>
                          <h4 className="edu-institute">{edu.institute}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="edu-card-body">
                      <div className="edu-focus-box">
                        <span className="edu-focus-label">Key Areas:</span>
                        <p className="edu-focus-text">{edu.focus}</p>
                      </div>

                      {edu.proofLink && (
                        <div className="edu-proof-row">
                          <a
                            href={edu.proofLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="edu-proof-link"
                          >
                            <span>Academic Milestone Proof on LinkedIn</span>
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      )}
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
