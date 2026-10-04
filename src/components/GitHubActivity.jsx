import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitCommit, GitPullRequest, Code2, AlertCircle } from 'lucide-react';
import { Github } from './Icons';
import profileData from '../data/profile.json';

export default function GitHubActivity() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="activity" className="github-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Open Source & Commits</span>
            <h2 className="section-title">GitHub Activity</h2>
            <p className="section-desc">
              Building consistently, one commit at a time.
            </p>
          </div>

          <div className="github-card card">
            <div className="github-card-header">
              <div className="github-user-info">
                <Github size={20} className="github-logo-icon" />
                <div>
                  <h3 className="github-handle">@Meexargha</h3>
                  <span className="github-subtitle">Public Repositories & Contributions</span>
                </div>
              </div>

              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <span>View GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Contribution Heatmap Container */}
            <div className="github-graph-container">
              {!imgError ? (
                <div className="github-graph-scroll">
                  <img
                    src="https://ghchart.rshah.org/38bdf8/Meexargha"
                    alt="Argha Kundu GitHub Contribution Graph"
                    className="github-chart-img"
                    onError={() => setImgError(true)}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="github-fallback-box">
                  <GitCommit size={24} className="fallback-icon" />
                  <p>Contributions recorded across personal repositories and open-source explorations.</p>
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <span>Inspect @Meexargha on GitHub</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
            </div>

            <div className="github-card-footer">
              <div className="github-legend">
                <span className="legend-label">Contributions</span>
                <div className="legend-squares">
                  <span className="legend-box level-0"></span>
                  <span className="legend-box level-1"></span>
                  <span className="legend-box level-2"></span>
                  <span className="legend-box level-3"></span>
                  <span className="legend-box level-4"></span>
                </div>
                <span className="legend-label">Active</span>
              </div>

              <div className="github-commit-quote">
                "Code every day, learn every day."
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
