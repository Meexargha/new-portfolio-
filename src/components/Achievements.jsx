import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowUpRight, Maximize2, X, Award, ExternalLink, Code2 } from 'lucide-react';
import { Linkedin, Leetcode } from './Icons';
import TiltCard from './TiltCard';
import achievementsData from '../data/achievements.json';

export default function Achievements() {
  const [selectedImage, setSelectedImage] = useState(null);

  const getActionIcon = (link) => {
    if (!link) return <ArrowUpRight size={14} />;
    if (link.includes('leetcode.com')) return <Leetcode size={14} className="action-brand-icon" />;
    if (link.includes('linkedin.com')) return <Linkedin size={14} className="action-brand-icon" />;
    return <ExternalLink size={14} />;
  };

  const getActionLabel = (item) => {
    if (item.linkLabel) return item.linkLabel;
    if (item.link?.includes('leetcode.com')) return 'View LeetCode Profile';
    if (item.link?.includes('linkedin.com')) return 'View LinkedIn Post';
    return 'View Resource';
  };

  return (
    <section id="achievements" className="achievements-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Milestones</span>
            <h2 className="section-title">Achievements</h2>
            <p className="section-desc">
              Competitive coding milestones, academic recognition, and algorithmic rankings.
            </p>
          </div>

          <div className="achievements-grid">
            {achievementsData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <TiltCard maxTilt={8} scale={1.02} className="h-full">
                  <div className={`achievement-card card h-full achievement-card-${item.id}`}>
                    {/* Header row with rank badge and category badge */}
                    <div className="achievement-card-header">
                      <div className="achievement-rank-box">
                        <span className={`achievement-rank-pill ${item.id === 3 ? 'rank-pill-leetcode' : item.id === 1 ? 'rank-pill-gold' : item.id === 2 ? 'rank-pill-codevita' : ''}`}>
                          {item.id === 3 ? (
                            <Leetcode size={14} className="trophy-icon trophy-leetcode" />
                          ) : (
                            <Trophy size={14} className="trophy-icon" />
                          )}
                          <span className="rank-value">{item.rank}</span>
                        </span>
                      </div>

                      {item.badge && (
                        <div className="achievement-badge-box">
                          <span className="badge badge-accent achievement-category-badge">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="achievement-title">{item.title}</h3>
                    <p className="achievement-desc">{item.description}</p>

                    {/* Sub details */}
                    <div className="achievement-meta">
                      <span className="meta-text">{item.institution}</span>
                      {item.period && <span className="meta-separator">•</span>}
                      {item.period && <span className="meta-text">{item.period}</span>}
                    </div>

                    {/* Verified Screenshot if provided */}
                    {item.image && (
                      <div 
                        className="achievement-image-container"
                        onClick={() => setSelectedImage(item.image)}
                        title="Click to view full verification screenshot"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="achievement-preview-img"
                          loading="lazy"
                        />
                        <div className="image-zoom-overlay">
                          <Maximize2 size={16} />
                          <span>View Leaderboard Proof</span>
                        </div>
                      </div>
                    )}

                    {/* Action Link (dynamic: LeetCode Profile, LinkedIn Post, etc.) */}
                    {item.link ? (
                      <div className="achievement-action-row">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`achievement-action-btn ${item.link.includes('leetcode.com') ? 'achievement-btn-leetcode' : 'achievement-btn-linkedin'}`}
                          aria-label={`${getActionLabel(item)} for ${item.title}`}
                        >
                          {getActionIcon(item.link)}
                          <span>{getActionLabel(item)}</span>
                          <ArrowUpRight size={14} className="action-arrow" />
                        </a>
                      </div>
                    ) : item.image ? (
                      <div className="achievement-action-row">
                        <button
                          type="button"
                          className="achievement-action-btn achievement-btn-proof"
                          onClick={() => setSelectedImage(item.image)}
                          aria-label="View Leaderboard Proof"
                        >
                          <Maximize2 size={14} />
                          <span>View Leaderboard Proof</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal for Leaderboard Screenshot */}
      {selectedImage && (
        <div 
          className="lightbox-overlay" 
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image modal"
            >
              <X size={20} />
            </button>
            <img
              src={selectedImage}
              alt="Achievement verification"
              className="lightbox-img"
            />
          </div>
        </div>
      )}
    </section>
  );
}
