import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, BookOpen, Video } from 'lucide-react';
import { Youtube } from './Icons';
import profileData from '../data/profile.json';

export default function YouTube() {
  const contentPillars = [
    {
      title: "Data Structures & Algorithms",
      desc: "Problem solving breakdowns and C++ implementations"
    },
    {
      title: "Backend Development",
      desc: "Node.js, Express.js architecture and REST API design"
    },
    {
      title: "Project Walkthroughs",
      desc: "End-to-end coding tutorials and developer workflows"
    }
  ];

  return (
    <section id="youtube" className="youtube-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Knowledge Sharing</span>
            <h2 className="section-title">I also teach</h2>
            <p className="section-desc">
              Sharing technical walkthroughs, DSA solutions, and engineering concepts on YouTube.
            </p>
          </div>

          <div className="youtube-card card">
            <div className="youtube-inner">
              <div className="youtube-info">
                <div className="youtube-badge-row">
                  <div className="youtube-brand-box">
                    <Youtube size={26} className="youtube-red-icon" />
                  </div>
                  <div>
                    <h3 className="youtube-channel-name">Rio Code</h3>
                    <span className="youtube-handle">@rio-code</span>
                  </div>
                </div>

                <p className="youtube-description">
                  Tech tutorials, DSA, programming and project walkthroughs designed to simplify complex computer science concepts for fellow developers.
                </p>

                <div className="youtube-actions">
                  <a
                    href={profileData.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <Play size={16} fill="currentColor" />
                    <span>Visit Channel</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>

              {/* Pillars / Content Topics */}
              <div className="youtube-pillars">
                {contentPillars.map((pillar, idx) => (
                  <div key={pillar.title} className="pillar-item">
                    <div className="pillar-number">0{idx + 1}</div>
                    <div>
                      <h4 className="pillar-title">{pillar.title}</h4>
                      <p className="pillar-desc">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
