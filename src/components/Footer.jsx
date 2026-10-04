import React from 'react';
import { Code2, ArrowUp } from 'lucide-react';
import { Github, Linkedin, Youtube } from './Icons';
import profileData from '../data/profile.json';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-name">{profileData.name}</h3>
            <p className="footer-tagline">
              Software Engineer · M.Tech AI · Builder
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-scroll-top"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp size={16} />
            <span>Top</span>
          </button>
        </div>

        <div className="footer-middle">
          <div className="footer-social-links">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <Github size={17} />
              <span>GitHub</span>
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
              <span>LinkedIn</span>
            </a>

            <a
              href={profileData.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LeetCode"
            >
              <Code2 size={17} />
              <span>LeetCode</span>
            </a>

            <a
              href={profileData.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="YouTube"
            >
              <Youtube size={17} />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 {profileData.name}. All rights reserved.
          </p>
          <p className="footer-credit">
            Built with React, curiosity and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
