import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  FileText, 
  Code2, 
  Sparkles,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { Github, Linkedin, Youtube } from './Icons';
import TiltCard from './TiltCard';
import Marquee from './Marquee';
import profileData from '../data/profile.json';

export default function Hero() {
  return (
    <>
      <section id="hero" className="hero-section section">
        {/* Subtle 3D background ambient grid */}
        <div className="hero-bg-grid-3d" aria-hidden="true"></div>

        <div className="container hero-container">
          {/* Left Column: Text & CTAs */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Status Badge */}
            <div className="hero-status-pill">
              <span className="status-dot"></span>
              <span className="hero-status-text">{profileData.status}</span>
            </div>

            {/* Heading with Cool Gradient */}
            <h1 className="hero-heading">
              Hi, I'm <span className="gradient-highlight">Argha</span>.
            </h1>

            {/* Mobile Profile Image (visible only on mobile beneath heading) */}
            <div className="hero-photo-mobile">
              <div className="hero-photo-frame">
                <img 
                  src="/profile/argha.jpg" 
                  alt="Argha Kundu — Software Engineer" 
                  className="hero-avatar-img"
                  loading="eager"
                />
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle">
              {profileData.subtitle}
            </p>

            {/* Supporting Text */}
            <p className="hero-supporting">
              {profileData.supporting}
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary btn-glow">
                <span>View Projects</span>
                <ArrowRight size={16} />
              </a>

              <a href="#contact" className="btn btn-secondary">
                <Mail size={16} />
                <span>Contact Me</span>
              </a>

              <a 
                href={profileData.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline"
                title="View and download full Resume PDF"
              >
                <FileText size={16} />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Links Row with Custom SVG Icons */}
            <div className="hero-socials">
              <a 
                href={profileData.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-item"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>

              <a 
                href={profileData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-item"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>

              <a 
                href={profileData.leetcode} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-item"
                aria-label="LeetCode Profile"
              >
                <Code2 size={18} />
                <span>LeetCode</span>
              </a>

              <a 
                href={profileData.youtube} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-item"
                aria-label="YouTube Channel"
              >
                <Youtube size={18} />
                <span>YouTube</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Desktop Profile Photo with 3D Tilt */}
          <motion.div 
            className="hero-photo-desktop"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          >
            <TiltCard maxTilt={12} scale={1.02} className="hero-photo-tilt">
              <div className="hero-photo-frame">
                <img 
                  src="/profile/argha.jpg" 
                  alt="Argha Kundu — Software Engineer" 
                  className="hero-avatar-img"
                  loading="eager"
                />
                
                {/* Floating 3D Badges */}
                <div className="photo-corner-badge">
                  <Sparkles size={13} className="text-cyan-400" />
                  <span>SWE & AI Scholar</span>
                </div>

                <div className="photo-corner-badge-top">
                  <span className="photo-badge-college-emblem">
                    <img src="/college/iiitg_logo.png" alt="IIITG" className="photo-badge-college-img" />
                  </span>
                  <span>IIIT Guwahati</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Cool Infinite Marquee Ticker */}
      <Marquee />
    </>
  );
}
