import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, GraduationCap, Cpu, Code2 } from 'lucide-react';
import TiltCard from './TiltCard';
import profileData from '../data/profile.json';

export default function About() {
  const highlights = [
    {
      icon: <Terminal size={18} className="highlight-icon" />,
      label: "Current Focus",
      value: "Backend & GenAI",
      sub: "APIs, LLMs & Cloud Systems"
    },
    {
      icon: (
        <span className="about-college-emblem">
          <img src="/college/iiitg_logo.png" alt="IIITG" className="about-college-img" />
        </span>
      ),
      label: "Higher Education",
      value: "M.Tech ECE (AI) '28",
      sub: "IIITG • 1st Semester"
    },
    {
      icon: <Cpu size={18} className="highlight-icon" />,
      label: "Undergraduate",
      value: "B.Tech ECE",
      sub: "Academy of Technology"
    },
    {
      icon: <Code2 size={18} className="highlight-icon" />,
      label: "Problem Solving",
      value: "300+ Solved",
      sub: "LeetCode & CodeVita"
    }
  ];

  return (
    <section id="about" className="about-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// About</span>
            <h2 className="section-title">A little about me</h2>
          </div>

          <TiltCard maxTilt={5} scale={1.01} className="about-tilt-wrapper">
            <div className="about-card card">
              <div className="about-bio-text">
                <p>
                  I'm a <strong>Software Engineer</strong> focused on backend development and currently expanding into <strong>Generative AI and LLM engineering</strong> while pursuing my <strong>M.Tech in ECE (Artificial Intelligence) at Indian Institute of Information Technology Guwahati (IIITG)</strong>.
                </p>
                <p>
                  I enjoy building scalable backend systems, experimenting with AI-powered applications, solving DSA problems, and sharing what I learn through technical content.
                </p>
              </div>

              {/* Quick Stat Highlights */}
              <div className="about-highlights-grid">
                {highlights.map((item, index) => (
                  <div key={index} className="about-highlight-item">
                    <div className="highlight-icon-box">{item.icon}</div>
                    <div className="highlight-text-box">
                      <span className="highlight-label">{item.label}</span>
                      <strong className="highlight-value">{item.value}</strong>
                      <span className="highlight-sub">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
