import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, FileText, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import profileData from '../data/profile.json';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Focus', href: '#focus' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Quotes', href: '#quotes' },
    { name: 'Activity', href: '#activity' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="container navbar-inner" aria-label="Main Navigation">
        {/* Brand */}
        <a href="#hero" className="navbar-brand" onClick={handleNavClick}>
          <span className="brand-dot"></span>
          <span className="brand-name">{profileData.name}</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="navbar-link"
              onClick={handleNavClick}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="navbar-actions">
          {/* Resume link */}
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-btn navbar-btn-resume"
            title="View Resume / CV"
          >
            <FileText size={15} />
            <span>Resume</span>
          </a>

          {/* GitHub link */}
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-icon-btn"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <Github size={18} />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="navbar-icon-btn theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-links">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="mobile-menu-link"
                  onClick={handleNavClick}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm mobile-resume-btn"
              >
                <FileText size={16} />
                <span>View Resume</span>
                <ArrowUpRight size={14} />
              </a>

              <div className="mobile-social-row">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-icon-btn"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-icon-btn"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
