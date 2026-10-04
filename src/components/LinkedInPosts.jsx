import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Linkedin } from './Icons';
import TiltCard from './TiltCard';
import profileData from '../data/profile.json';

export default function LinkedInPosts() {
  const posts = [
    {
      title: "System Architecture Specification for Streamify",
      date: "Technical Specification",
      excerpt: "Deep architecture breakdown for Streamify Video Sharing platform, covering modular layered REST API patterns, Cloudinary asset pipelines, and MongoDB indexing strategies.",
      link: "https://lnkd.in/p/d8CFkn_g",
      tag: "System Design",
      proofType: "Engineering Proof"
    },
    {
      title: "Revisiting Backend Development Fundamentals",
      date: "Core Engineering",
      excerpt: "Hands-on engineering reflections covering Node.js, Express.js architecture, robust error handling, and scalable database operations.",
      link: "https://lnkd.in/p/dgdsarin",
      tag: "Backend Deep-Dive",
      proofType: "Technical Insights"
    },
    {
      title: "Academic Journey, Growth Mindset & Resilience",
      date: "Academic Milestone",
      excerpt: "Reflections on continuous learning, engineering discipline, and academic progression at Indian Institute of Information Technology Guwahati (IIITG).",
      link: "https://lnkd.in/p/deTJbN2D",
      tag: "IIITG Proof",
      proofType: "Verified Milestone"
    },
    {
      title: "TCS CodeVita 2025 — AIR 3929",
      date: "Competitive Programming",
      excerpt: "Official update on achieving All India Rank 3929 in TCS CodeVita 2025, solving competitive algorithmic challenges among top engineering students nationwide.",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7397405188531154944/",
      tag: "AIR 3929",
      proofType: "Official Rank Proof"
    }
  ];

  return (
    <section id="linkedin" className="linkedin-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Verified Activity</span>
            <h2 className="section-title">From LinkedIn</h2>
            <p className="section-desc">
              Verified technical posts, system design breakdowns, and academic milestones shared with the community.
            </p>
          </div>

          <div className="linkedin-grid linkedin-grid-4">
            {posts.map((post, idx) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <TiltCard className="linkedin-tilt-card" maxTilt={10}>
                  <div className="linkedin-card card h-full">
                    <div className="linkedin-card-top">
                      <div className="linkedin-brand-row">
                        <span className="linkedin-icon-box">
                          <Linkedin size={18} />
                        </span>
                        <span className="badge badge-accent">{post.tag}</span>
                      </div>
                      <span className="linkedin-date">{post.date}</span>
                    </div>

                    <h3 className="linkedin-post-title">{post.title}</h3>
                    <p className="linkedin-post-excerpt">{post.excerpt}</p>

                    <div className="linkedin-card-footer">
                      <div className="linkedin-proof-badge">
                        <ShieldCheck size={13} className="proof-icon" />
                        <span>{post.proofType}</span>
                      </div>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-link-btn"
                        aria-label={`View verified LinkedIn post for ${post.title}`}
                      >
                        <span>View Post</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
