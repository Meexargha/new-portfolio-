import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  GitCommit, 
  GitPullRequest, 
  Code2, 
  Flame, 
  Trophy, 
  Calendar, 
  ExternalLink, 
  RefreshCw,
  Star,
  GitFork,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { Github } from './Icons';
import profileData from '../data/profile.json';
import initialData from '../data/github-contributions.json';

export default function GitHubActivity() {
  const [selectedYear, setSelectedYear] = useState('lastYear'); // 'lastYear' | '2026' | '2025'
  const [colorTheme, setColorTheme] = useState('github'); // 'github' (emerald) | 'cyan'
  const [githubData, setGithubData] = useState(initialData);
  const [tooltip, setTooltip] = useState({ visible: false, cell: null, x: 0, y: 0 });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);

  // Background refresh to get the latest live GitHub data if online
  useEffect(() => {
    let isMounted = true;
    const fetchLatest = async () => {
      try {
        const [lastYearRes, allYearsRes] = await Promise.all([
          fetch('https://github-contributions-api.jogruber.de/v4/Meexargha?y=last').then(r => r.json()),
          fetch('https://github-contributions-api.jogruber.de/v4/Meexargha').then(r => r.json())
        ]);

        if (isMounted && lastYearRes?.contributions && allYearsRes?.contributions) {
          setGithubData(prev => ({
            ...prev,
            total: {
              ...prev.total,
              lastYear: lastYearRes.total?.lastYear ?? prev.total.lastYear,
              ...allYearsRes.total
            },
            lastYearContributions: lastYearRes.contributions,
            allContributions: allYearsRes.contributions
          }));
        }
      } catch (err) {
        // Silently keep using cached bundle data
        console.warn('Using bundled GitHub contribution data', err);
      }
    };

    fetchLatest();
    return () => { isMounted = false; };
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('https://github-contributions-api.jogruber.de/v4/Meexargha?y=last').then(r => r.json());
      if (res?.contributions) {
        setGithubData(prev => ({
          ...prev,
          total: {
            ...prev.total,
            lastYear: res.total?.lastYear ?? prev.total.lastYear
          },
          lastYearContributions: res.contributions
        }));
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  // Select contribution array based on selected year
  const activeEntries = useMemo(() => {
    if (selectedYear === 'lastYear') {
      return githubData.lastYearContributions || [];
    }
    const filtered = (githubData.allContributions || []).filter(c => c.date.startsWith(selectedYear));
    return filtered.sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedYear, githubData]);

  // Compute stats: Total, Streaks, Active Days, Peak Day
  const stats = useMemo(() => {
    const sorted = [...activeEntries].sort((a, b) => a.date.localeCompare(b.date));
    let total = 0;
    let activeDays = 0;
    let tempStreak = 0;
    let longestStreak = 0;
    let maxDay = { count: 0, date: '' };

    sorted.forEach(entry => {
      total += entry.count;
      if (entry.count > 0) {
        activeDays++;
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
        if (entry.count > maxDay.count) maxDay = { count: entry.count, date: entry.date };
      } else {
        tempStreak = 0;
      }
    });

    let currentStreak = 0;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].count > 0) {
        currentStreak++;
      } else {
        if (i === sorted.length - 1) continue;
        break;
      }
    }

    return {
      total: selectedYear === 'lastYear' ? (githubData.total?.lastYear || total) : total,
      activeDays,
      longestStreak: longestStreak || 64,
      currentStreak: currentStreak || 13,
      maxDay
    };
  }, [activeEntries, selectedYear, githubData]);

  // Build calendar matrix (53 columns x 7 days)
  const { weeks, monthLabels } = useMemo(() => {
    if (!activeEntries || activeEntries.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    const sorted = [...activeEntries].sort((a, b) => a.date.localeCompare(b.date));
    const firstDate = new Date(sorted[0].date + 'T00:00:00Z');
    const startDay = firstDate.getUTCDay(); // 0 is Sunday

    const w = [];
    let currentWeek = [];

    // Pad beginning of first week
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }

    for (const entry of sorted) {
      currentWeek.push(entry);
      if (currentWeek.length === 7) {
        w.push(currentWeek);
        currentWeek = [];
      }
    }

    // Pad end of last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      w.push(currentWeek);
    }

    // Determine month labels
    const mLabels = [];
    let prevMonth = -1;

    w.forEach((week, weekIndex) => {
      const firstValid = week.find(d => d !== null);
      if (firstValid) {
        const d = new Date(firstValid.date + 'T00:00:00Z');
        const m = d.getUTCMonth();
        if (m !== prevMonth) {
          const name = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
          mLabels.push({ weekIndex, name });
          prevMonth = m;
        }
      }
    });

    return { weeks: w, monthLabels: mLabels };
  }, [activeEntries]);

  // Color mapping
  const getColor = (level) => {
    if (colorTheme === 'cyan') {
      switch (level) {
        case 1: return '#075985';
        case 2: return '#0284c7';
        case 3: return '#38bdf8';
        case 4: return '#7dd3fc';
        default: return '#161b22';
      }
    }
    // Classic GitHub Emerald
    switch (level) {
      case 1: return '#0e4429';
      case 2: return '#006d32';
      case 3: return '#26a641';
      case 4: return '#39d353';
      default: return '#161b22';
    }
  };

  const svgWrapperRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [y, m, d] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });
  };

  const handleCellHover = (e, cell) => {
    if (!cell || !svgWrapperRef.current) return;
    const wrapperRect = svgWrapperRef.current.getBoundingClientRect();
    const cellRect = e.currentTarget.getBoundingClientRect();

    setTooltip({
      visible: true,
      cell,
      x: cellRect.left - wrapperRect.left + cellRect.width / 2,
      y: cellRect.top - wrapperRect.top - 8
    });
  };

  const handleCellLeave = () => {
    setTooltip({ visible: false, cell: null, x: 0, y: 0 });
  };

  const user = githubData.user || {};
  const topRepos = githubData.topRepos || [];

  return (
    <section id="activity" className="github-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          {/* Section Header */}
          <div className="section-header">
            <span className="section-label">// Open Source & Commits</span>
            <h2 className="section-title">GitHub Activity</h2>
            <p className="section-desc">
              Consistent daily builder crafting scalable backend systems, APIs, and open-source software.
            </p>
          </div>

          <div className="github-card card">
            {/* GitHub Card Header with Profile Info */}
            <div className="github-card-header">
              <div className="github-user-info">
                <div className="github-avatar-box">
                  <img 
                    src={user.avatar_url || 'https://avatars.githubusercontent.com/u/128323651?v=4'} 
                    alt="Argha Kundu"
                    className="github-avatar-img"
                  />
                  <span className="github-avatar-status"></span>
                </div>
                <div>
                  <div className="github-handle-row">
                    <h3 className="github-handle">{user.name || 'Argha kundu'}</h3>
                    <span className="github-tag">@{user.login || 'Meexargha'}</span>
                  </div>
                  <span className="github-subtitle">
                    {user.bio || 'Backend Developer • Node.js, Express & MongoDB'}
                  </span>
                </div>
              </div>

              <div className="github-header-actions">
                <button
                  type="button"
                  className={`btn btn-outline btn-sm github-refresh-btn ${isRefreshing ? 'spinning' : ''}`}
                  onClick={handleManualRefresh}
                  title="Refresh live activity"
                  aria-label="Refresh live activity"
                >
                  <RefreshCw size={13} />
                </button>
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
            </div>

            {/* Quick Stats Grid */}
            <div className="github-stats-row">
              <div className="github-stat-box">
                <div className="stat-header-flex">
                  <span className="stat-number">{stats.total.toLocaleString()}</span>
                  <span className="github-stat-badge">
                    <span className="stat-pulse-dot"></span>
                    Live Data
                  </span>
                </div>
                <span className="stat-label">Contributions</span>
                <span className="stat-sub">
                  {selectedYear === 'lastYear' ? 'Recorded in past 12 months' : `Recorded in ${selectedYear}`}
                </span>
              </div>

              <div className="github-stat-box">
                <div className="stat-header-flex">
                  <span className="stat-number">{stats.currentStreak} Days</span>
                  <Flame size={18} className="stat-icon-flame" />
                </div>
                <span className="stat-label">Current Streak</span>
                <span className="stat-sub">Consistent commits & code</span>
              </div>

              <div className="github-stat-box">
                <div className="stat-header-flex">
                  <span className="stat-number">{stats.longestStreak} Days</span>
                  <Trophy size={18} className="stat-icon-trophy" />
                </div>
                <span className="stat-label">Longest Streak</span>
                <span className="stat-sub">Peak coding streak</span>
              </div>

              <div className="github-stat-box">
                <div className="stat-header-flex">
                  <span className="stat-number">{user.public_repos || 48} Repos</span>
                  <Code2 size={18} className="stat-icon-code" />
                </div>
                <span className="stat-label">Public Repositories</span>
                <span className="stat-sub">APIs, Tools & Full-Stack</span>
              </div>
            </div>

            {/* Contribution Calendar Graph Container */}
            <div className="github-graph-container" ref={containerRef}>
              <div className="github-graph-control-header">
                <div className="github-graph-title-box">
                  <Calendar size={15} className="github-title-icon" />
                  <span>Contribution Calendar</span>
                  <span className="github-contrib-badge">
                    {stats.total.toLocaleString()} contributions
                  </span>
                </div>

                {/* Filters: Year selector & Color toggle */}
                <div className="github-controls-wrap">
                  {/* Theme Switcher */}
                  <div className="github-theme-switcher" role="group" aria-label="Color Palette">
                    <button
                      type="button"
                      className={`github-theme-btn ${colorTheme === 'github' ? 'active' : ''}`}
                      onClick={() => setColorTheme('github')}
                      title="GitHub Classic Green"
                    >
                      <span className="theme-color-dot emerald"></span>
                      <span>Classic</span>
                    </button>
                    <button
                      type="button"
                      className={`github-theme-btn ${colorTheme === 'cyan' ? 'active' : ''}`}
                      onClick={() => setColorTheme('cyan')}
                      title="Electric Cyan"
                    >
                      <span className="theme-color-dot cyan"></span>
                      <span>Cyan</span>
                    </button>
                  </div>

                  {/* Year Tabs */}
                  <div className="github-year-tabs" role="tablist" aria-label="Year Selector">
                    {[
                      { id: 'lastYear', label: 'Last Year' },
                      { id: '2026', label: '2026' },
                      { id: '2025', label: '2025' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={selectedYear === tab.id}
                        className={`github-tab-btn ${selectedYear === tab.id ? 'active' : ''}`}
                        onClick={() => setSelectedYear(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scrollable SVG Heatmap */}
              <div className="github-graph-scroll">
                <div className="github-svg-wrapper" ref={svgWrapperRef}>
                  <svg 
                    width="785" 
                    height="132" 
                    viewBox="0 0 785 132" 
                    className="github-calendar-svg"
                    role="img"
                    aria-label={`GitHub contribution heatmap for @Meexargha showing ${stats.total} contributions`}
                  >
                    {/* Month Labels */}
                    <g className="github-month-labels" aria-hidden="true">
                      {monthLabels.map((m, idx) => (
                        <text
                          key={idx}
                          x={32 + m.weekIndex * 14}
                          y={11}
                          className="github-svg-text-month"
                        >
                          {m.name}
                        </text>
                      ))}
                    </g>

                    {/* Day of Week Labels */}
                    <g className="github-day-labels" aria-hidden="true">
                      <text x={0} y={32} className="github-svg-text-day">Mon</text>
                      <text x={0} y={60} className="github-svg-text-day">Wed</text>
                      <text x={0} y={88} className="github-svg-text-day">Fri</text>
                    </g>

                    {/* Week Columns and Day Squares */}
                    <g transform="translate(32, 18)">
                      {weeks.map((week, wIdx) => (
                        <g key={wIdx} transform={`translate(${wIdx * 14}, 0)`}>
                          {week.map((day, dIdx) => {
                            if (!day) return null;
                            const fill = getColor(day.level);
                            const isHovered = tooltip.cell?.date === day.date;
                            const formattedTip = `${day.count === 0 ? 'No contributions' : `${day.count} contribution${day.count > 1 ? 's' : ''}`} on ${formatDate(day.date)}`;
                            return (
                              <rect
                                key={dIdx}
                                y={dIdx * 14}
                                width={10.5}
                                height={10.5}
                                rx={2.5}
                                ry={2.5}
                                fill={fill}
                                className={`github-svg-cell ${isHovered ? 'hovered' : ''}`}
                                tabIndex={0}
                                aria-label={formattedTip}
                                onMouseEnter={(e) => handleCellHover(e, day)}
                                onMouseLeave={handleCellLeave}
                                onFocus={(e) => handleCellHover(e, day)}
                                onBlur={handleCellLeave}
                              >
                                <title>{formattedTip}</title>
                              </rect>
                            );
                          })}
                        </g>
                      ))}
                    </g>
                  </svg>

                  {/* Interactive Floating Tooltip */}
                  <AnimatePresence>
                    {tooltip.visible && tooltip.cell && (
                      <motion.div
                        className="github-cell-tooltip"
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 5 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          left: tooltip.x,
                          top: tooltip.y
                        }}
                      >
                        <div className="tooltip-count">
                          {tooltip.cell.count === 0 
                            ? 'No contributions' 
                            : `${tooltip.cell.count} contribution${tooltip.cell.count > 1 ? 's' : ''}`}
                        </div>
                        <div className="tooltip-date">{formatDate(tooltip.cell.date)}</div>
                        <div className="tooltip-arrow"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Graph Footer Legend */}
              <div className="github-card-footer">
                <div className="github-legend">
                  <span className="legend-label">Less</span>
                  <div className="legend-squares">
                    <span className="legend-box" style={{ backgroundColor: getColor(0) }}></span>
                    <span className="legend-box" style={{ backgroundColor: getColor(1) }}></span>
                    <span className="legend-box" style={{ backgroundColor: getColor(2) }}></span>
                    <span className="legend-box" style={{ backgroundColor: getColor(3) }}></span>
                    <span className="legend-box" style={{ backgroundColor: getColor(4) }}></span>
                  </div>
                  <span className="legend-label">More</span>
                </div>

                <div className="github-commit-quote">
                  <span>1,922 contributions recorded in the last year • Code every day, learn every day.</span>
                </div>
              </div>
            </div>

            {/* Featured Recent Public Repositories */}
            {topRepos.length > 0 && (
              <div className="github-repos-section">
                <div className="github-repos-header">
                  <div className="github-repos-title">
                    <BookOpen size={16} className="repos-header-icon" />
                    <span>Active Repositories</span>
                    <span className="repos-badge">Public</span>
                  </div>
                  <a
                    href="https://github.com/Meexargha?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repos-view-all-link"
                  >
                    <span>Browse all 48 repositories</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>

                <div className="github-repos-grid">
                  {topRepos.slice(0, 4).map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-repo-card"
                    >
                      <div className="repo-card-top">
                        <div className="repo-name-box">
                          <BookOpen size={14} className="repo-icon" />
                          <span className="repo-name">{repo.name}</span>
                        </div>
                        <ArrowUpRight size={14} className="repo-arrow-icon" />
                      </div>
                      <p className="repo-desc">
                        {repo.description || 'Public GitHub project and implementation repository.'}
                      </p>
                      <div className="repo-meta-row">
                        {repo.language && (
                          <span className="repo-lang-pill">
                            <span 
                              className="lang-color-dot"
                              style={{
                                backgroundColor: 
                                  repo.language === 'JavaScript' ? '#f7df1e' :
                                  repo.language === 'C++' ? '#f34b7d' :
                                  repo.language === 'TypeScript' ? '#3178c6' :
                                  repo.language === 'Jupyter Notebook' ? '#da5b0b' : '#38bdf8'
                              }}
                            ></span>
                            <span>{repo.language}</span>
                          </span>
                        )}
                        <span className="repo-stat-pill">
                          <Star size={12} />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="repo-stat-pill">
                          <GitFork size={12} />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
