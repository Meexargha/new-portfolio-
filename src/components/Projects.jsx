import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projects.json';

export default function Projects() {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Work & Engineering</span>
            <h2 className="section-title">Selected Projects</h2>
            <p className="section-desc">
              Real-world backend systems, AI assistants, and research prototypes built with modular architectures.
            </p>
          </div>

          {/* Featured Projects Grid (Streamify and MTECH-BOT prominent) */}
          <div className="projects-featured-grid">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <ProjectCard project={project} isFeatured={true} />
              </motion.div>
            ))}
          </div>

          {/* Other Projects Grid */}
          <div className="projects-secondary-grid">
            {otherProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
              >
                <ProjectCard project={project} isFeatured={false} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
