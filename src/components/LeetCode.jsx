import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowUpRight, CheckCircle2, Terminal, Target } from 'lucide-react';
import profileData from '../data/profile.json';

export default function LeetCode() {
  const dsaTopics = [
    "Arrays & Hashing",
    "Two Pointers",
    "Linked Lists",
    "Binary Search",
    "Trees & Graphs",
    "Dynamic Programming",
    "C++ STL"
  ];

  return (
    <section id="leetcode" className="leetcode-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Algorithms & DSA</span>
            <h2 className="section-title">Problem Solving</h2>
            <p className="section-desc">
              Consistent practice in data structures and algorithmic problem solving.
            </p>
          </div>

          <div className="leetcode-card card">
            <div className="leetcode-card-header">
              <div className="leetcode-profile-row">
                <div className="leetcode-icon-box">
                  <Code2 size={22} />
                </div>
                <div>
                  <h3 className="leetcode-username">ARGHAKUNDU</h3>
                  <span className="leetcode-sub">LeetCode Profile & Submissions</span>
                </div>
              </div>

              <a
                href={profileData.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <span>View LeetCode</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="leetcode-stats-row">
              <div className="leetcode-stat-box">
                <span className="stat-number">300+</span>
                <span className="stat-label">Problems Solved</span>
                <span className="stat-sub">Across Easy, Medium & Hard</span>
              </div>

              <div className="leetcode-stat-box">
                <span className="stat-number">C++</span>
                <span className="stat-label">Primary Language</span>
                <span className="stat-sub">High-Performance Implementation</span>
              </div>

              <div className="leetcode-stat-box">
                <span className="stat-number">AIR 3929</span>
                <span className="stat-label">TCS CodeVita</span>
                <span className="stat-sub">Global Coding Competition</span>
              </div>
            </div>

            <div className="leetcode-topics-container">
              <span className="topics-heading">Core DSA Topic Coverage:</span>
              <div className="topics-pill-grid">
                {dsaTopics.map((topic) => (
                  <span key={topic} className="dsa-topic-pill">
                    <CheckCircle2 size={12} className="check-icon" />
                    <span>{topic}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="leetcode-card-footer">
              <span className="leetcode-note">
                Verified milestone from official LeetCode profile and technical track record.
              </span>
              <a
                href={profileData.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="leetcode-direct-link"
              >
                <span>Visit leetcode.com/u/ARGHAKUNDU</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
