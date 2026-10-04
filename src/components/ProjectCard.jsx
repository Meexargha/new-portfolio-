import React from 'react';
import { ExternalLink, ArrowUpRight, Radio, Sparkles, FileCode2 } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import TiltCard from './TiltCard';

export default function ProjectCard({ project, isFeatured }) {
  const {
    title,
    subtitle,
    category,
    description,
    technologies,
    github,
    live,
    linkedinPost,
    image,
    highlights,
    isHardware
  } = project;

  return (
    <TiltCard 
      className={`project-tilt-container ${isFeatured ? 'project-featured-container' : ''}`}
      maxTilt={isFeatured ? 6 : 8}
      scale={1.015}
    >
      <article className={`project-card card ${isFeatured ? 'project-card-featured' : ''}`}>
        {/* Thumbnail Container */}
        <div className="project-image-wrapper">
          <img
            src={image}
            alt={`${title} — ${subtitle}`}
            className="project-image"
            loading="lazy"
          />
          <div className="project-category-badge">
            {category}
          </div>
          {isFeatured && (
            <div className="project-featured-tag">
              <Sparkles size={11} />
              <span>Featured</span>
            </div>
          )}
          {isHardware && (
            <div className="project-hardware-tag">
              <Radio size={11} />
              <span>ECE Hardware / R&D</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="project-content">
          <div className="project-header">
            <div>
              <span className="project-subtitle">{subtitle}</span>
              <h3 className="project-title">{title}</h3>
            </div>
          </div>

          <p className="project-description">{description}</p>

          {/* Highlights / Verified Features */}
          {highlights && highlights.length > 0 && (
            <ul className="project-highlights-list">
              {highlights.map((point, index) => (
                <li key={index} className="project-highlight-point">
                  <span className="point-bullet">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Technologies Pills */}
          <div className="project-tech-list">
            {technologies.map((tech) => (
              <span key={tech} className="project-tech-pill">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="project-footer">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-link"
                aria-label={`View ${title} source code on GitHub`}
              >
                <Github size={16} />
                <span>Source Code</span>
                <ArrowUpRight size={14} className="action-arrow" />
              </a>
            )}

            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-link project-action-live"
                aria-label={`View live demo of ${title}`}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
                <ArrowUpRight size={14} className="action-arrow" />
              </a>
            )}

            {linkedinPost && (
              <a
                href={linkedinPost}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-link project-action-linkedin"
                aria-label={`View LinkedIn architecture post for ${title}`}
                title="View Verified Technical Post on LinkedIn"
              >
                <Linkedin size={15} />
                <span>Tech Post</span>
                <ArrowUpRight size={14} className="action-arrow" />
              </a>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
