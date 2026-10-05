import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  ArrowUpRight, 
  CheckCircle2, 
  Calendar, 
  PieChart, 
  Activity, 
  Flame, 
  RefreshCw, 
  Trophy, 
  Award 
} from 'lucide-react';
import profileData from '../data/profile.json';

export default function LeetCode({ theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState('heatmap'); // 'heatmap' | 'stats' | 'activity'
  const [loadedTabs, setLoadedTabs] = useState({});
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const dsaTopics = [
    "Arrays & Hashing",
    "Two Pointers",
    "Linked Lists",
    "Binary Search",
    "Trees & Graphs",
    "Dynamic Programming",
    "C++ STL"
  ];

  // Map app theme to leetcard theme
  const cardTheme = theme === 'light' ? 'light' : 'dark';

  const tabs = [
    {
      id: 'heatmap',
      label: 'Heatmap',
      icon: Flame,
      ext: 'heatmap',
      caption: '📅 52-week activity heatmap highlighting consistency and submission density.'
    },
    {
      id: 'stats',
      label: 'Breakdown',
      icon: PieChart,
      ext: '',
      caption: '📊 Overall progress ring with Easy, Medium, and Hard solved ratios.'
    },
    {
      id: 'activity',
      label: 'Recent',
      icon: Calendar,
      ext: 'activity',
      caption: '⚡ Recent solved algorithms, accepted submissions, and language breakdown.'
    }
  ];

  const currentTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];
  const isCurrentLoaded = !!loadedTabs[`${activeTab}-${cardTheme}-${reloadKey}`];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setHasError(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setReloadKey((prev) => prev + 1);
  };

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
            <h2 className="section-title">Problem Solving & LeetCode</h2>
            <p className="section-desc">
              Daily practice in data structures, algorithms, and high-performance competitive programming.
            </p>
          </div>

          <div className="leetcode-card card">
            {/* Header */}
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

              <div className="leetcode-header-actions">
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
            </div>

            {/* Quick Stats Grid */}
            <div className="leetcode-stats-row">
              <div className="leetcode-stat-box">
                <div className="stat-header-flex">
                  <span className="stat-number">321</span>
                  <span className="stat-badge-solved">Solved</span>
                </div>
                <span className="stat-label">Problems Solved</span>
                <div className="difficulty-pills-row">
                  <span className="diff-pill easy">95 Easy</span>
                  <span className="diff-pill med">179 Med</span>
                  <span className="diff-pill hard">47 Hard</span>
                </div>
              </div>

              <div className="leetcode-stat-box">
                <div className="stat-header-flex">
                  <span className="stat-number">#461K</span>
                  <Trophy size={16} className="stat-icon-trophy" />
                </div>
                <span className="stat-label">Global Ranking</span>
                <span className="stat-sub">Top Tier LeetCode Submissions</span>
              </div>

              <div className="leetcode-stat-box">
                <div className="stat-header-flex">
                  <span className="stat-number">C++</span>
                  <Award size={16} className="stat-icon-award" />
                </div>
                <span className="stat-label">Primary Language</span>
                <span className="stat-sub">High-Performance Implementation</span>
              </div>

              <div className="leetcode-stat-box">
                <div className="stat-header-flex">
                  <span className="stat-number">AIR 3929</span>
                </div>
                <span className="stat-label">TCS CodeVita</span>
                <span className="stat-sub">Global Coding Competition</span>
              </div>
            </div>

            {/* LeetCode Interactive Graph Container */}
            <div className="leetcode-graph-container">
              <div className="leetcode-graph-header">
                <div className="leetcode-graph-title-box">
                  <Activity size={16} className="leetcode-title-icon" />
                  <span>LeetCode Activity Graph</span>
                  <span className="leetcode-live-badge">
                    <span className="leetcode-live-dot"></span>
                    Live Sync
                  </span>
                </div>

                {/* Graph Tab Switcher */}
                <div className="leetcode-tabs" role="tablist" aria-label="LeetCode graph view selector">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`leetcode-tab-btn ${isActive ? 'active' : ''}`}
                        onClick={() => handleTabChange(tab.id)}
                      >
                        <Icon size={13} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Viewport for Graph */}
              <div className="leetcode-graph-viewport">
                {!isCurrentLoaded && !hasError && (
                  <div className="leetcode-graph-skeleton">
                    <div className="skeleton-pulse"></div>
                    <span className="skeleton-text">Loading LeetCode Graph...</span>
                  </div>
                )}

                {hasError ? (
                  <div className="leetcode-graph-error">
                    <p>Unable to load graph preview from server.</p>
                    <div className="leetcode-error-actions">
                      <button onClick={handleRetry} className="btn btn-sm btn-outline">
                        <RefreshCw size={13} />
                        <span>Retry</span>
                      </button>
                      <a
                        href={profileData.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-secondary"
                      >
                        <span>View Directly on LeetCode</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="leetcode-graph-svg-wrapper">
                    {tabs.map((tab) => {
                      const url = `https://leetcard.jacoblin.cool/ARGHAKUNDU?theme=${cardTheme}&font=Inter${tab.ext ? `&ext=${tab.ext}` : ''}`;
                      const isCurrent = activeTab === tab.id;
                      const cacheKey = `${tab.id}-${cardTheme}-${reloadKey}`;
                      const isLoaded = !!loadedTabs[cacheKey];

                      return (
                        <img
                          key={cacheKey}
                          src={url}
                          alt={`Argha Kundu LeetCode ${tab.label} Graph`}
                          className={`leetcode-graph-img ${isCurrent ? 'active' : 'hidden'}`}
                          style={{
                            display: isCurrent ? 'block' : 'none',
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease'
                          }}
                          onLoad={() => {
                            setLoadedTabs((prev) => ({ ...prev, [cacheKey]: true }));
                          }}
                          onError={() => {
                            if (isCurrent) setHasError(true);
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Graph Sub-Footer / Caption */}
              <div className="leetcode-graph-subfooter">
                <span className="leetcode-graph-caption">
                  {currentTabObj.caption}
                </span>

                <div className="leetcode-subfooter-links">
                  <a
                    href={profileData.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leetcode-mini-link"
                  >
                    <span>leetcode.com/u/ARGHAKUNDU</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Core DSA Topics */}
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

            {/* Footer */}
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
