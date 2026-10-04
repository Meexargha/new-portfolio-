import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Bot, CloudRain, Terminal, Wrench, Sparkles, Layers } from 'lucide-react';
import TiltCard from './TiltCard';

export default function TechStack() {
  const featuredStack = [
    {
      name: "Python",
      role: "AI, GenAI & Algorithmic Workflows",
      icon: "/icons/tech/python.svg",
      color: "#3776AB",
      badge: "Core AI",
      glow: "rgba(55, 118, 171, 0.25)"
    },
    {
      name: "Node.js",
      role: "High-Concurrency Backend Services",
      icon: "/icons/tech/nodejs.svg",
      color: "#5FA04E",
      badge: "Backend",
      glow: "rgba(95, 160, 78, 0.25)"
    },
    {
      name: "C++",
      role: "300+ LeetCode DSA & High Performance",
      icon: "/icons/tech/cplusplus.svg",
      color: "#00599C",
      badge: "Algorithms",
      glow: "rgba(0, 89, 156, 0.25)"
    },
    {
      name: "Docker",
      role: "Containerization & Microservices",
      icon: "/icons/tech/docker.svg",
      color: "#2496ED",
      badge: "DevOps",
      glow: "rgba(36, 150, 237, 0.25)"
    },
    {
      name: "AWS",
      role: "Cloud Architecture & Deployments",
      icon: "/icons/tech/aws.svg",
      color: "#FF9900",
      badge: "Cloud",
      glow: "rgba(255, 153, 0, 0.25)"
    },
    {
      name: "MongoDB",
      role: "Flexible NoSQL Schema Engineering",
      icon: "/icons/tech/mongodb.svg",
      color: "#47A248",
      badge: "Database",
      glow: "rgba(71, 162, 72, 0.25)"
    },
    {
      name: "PostgreSQL",
      role: "ACID Relational Modeling & Prisma",
      icon: "/icons/tech/postgresql.svg",
      color: "#336791",
      badge: "SQL",
      glow: "rgba(51, 103, 145, 0.25)"
    },
    {
      name: "Generative AI",
      role: "LLM APIs, Prompting & RAG Pipelines",
      icon: "/icons/tech/genai.svg",
      color: "#A855F7",
      badge: "GenAI",
      glow: "rgba(168, 85, 247, 0.25)"
    },
    {
      name: "Fastify",
      role: "High-Throughput Low-Overhead Server",
      icon: "/icons/tech/fastify.svg",
      color: "#38bdf8",
      badge: "Framework",
      glow: "rgba(56, 189, 248, 0.25)"
    },
    {
      name: "Appwrite",
      role: "Scalable BaaS, Auth & Storage Cloud",
      icon: "/icons/tech/appwrite.svg",
      color: "#FD366E",
      badge: "BaaS",
      glow: "rgba(253, 54, 110, 0.25)"
    },
    {
      name: "Redis",
      role: "In-Memory Caching & Distributed Stores",
      icon: "/icons/tech/redis.svg",
      color: "#DC382D",
      badge: "Cache / PubSub",
      glow: "rgba(220, 56, 45, 0.25)"
    },
    {
      name: "GraphQL",
      role: "Precise Query Architecture & Schemas",
      icon: "/icons/tech/graphql.svg",
      color: "#E10098",
      badge: "API Spec",
      glow: "rgba(225, 0, 152, 0.25)"
    }
  ];

  const categories = [
    {
      name: "Backend Architecture",
      icon: <Database size={18} className="text-cyan-400" />,
      skills: [
        { name: "Node.js", icon: "/icons/tech/nodejs.svg" },
        { name: "Express.js", icon: "/icons/tech/express.svg" },
        { name: "Fastify", icon: "/icons/tech/fastify.svg" },
        { name: "Appwrite", icon: "/icons/tech/appwrite.svg" },
        { name: "REST APIs", icon: "/icons/tech/restapi.svg" },
        { name: "GraphQL", icon: "/icons/tech/graphql.svg" },
        { name: "MongoDB", icon: "/icons/tech/mongodb.svg" },
        { name: "PostgreSQL", icon: "/icons/tech/postgresql.svg" },
        { name: "Redis", icon: "/icons/tech/redis.svg" },
        { name: "Prisma", icon: "/icons/tech/prisma.svg" },
        { name: "Socket.io", icon: "/icons/tech/socketio.svg" },
        { name: "JWT", icon: "/icons/tech/jwt.svg" }
      ]
    },
    {
      name: "AI & GenAI",
      icon: <Bot size={18} className="text-violet-400" />,
      skills: [
        { name: "Generative AI", icon: "/icons/tech/genai.svg" },
        { name: "LLMs", icon: "/icons/tech/llm-brain.svg" },
        { name: "LLM APIs", icon: "/icons/tech/llm-api.svg" },
        { name: "Prompt Engineering", icon: "/icons/tech/prompt-eng.svg" },
        { name: "RAG Architecture", icon: "/icons/tech/rag-vector.svg" },
        { name: "Python", icon: "/icons/tech/python.svg" }
      ]
    },
    {
      name: "Cloud & DevOps",
      icon: <CloudRain size={18} className="text-sky-400" />,
      skills: [
        { name: "Docker", icon: "/icons/tech/docker.svg" },
        { name: "AWS", icon: "/icons/tech/aws.svg" },
        { name: "Linux", icon: "/icons/tech/linux.svg" },
        { name: "Vercel", icon: "/icons/tech/vercel.svg" }
      ]
    },
    {
      name: "Languages",
      icon: <Terminal size={18} className="text-emerald-400" />,
      skills: [
        { name: "C++", icon: "/icons/tech/cplusplus.svg" },
        { name: "Python", icon: "/icons/tech/python.svg" },
        { name: "JavaScript", icon: "/icons/tech/javascript.svg" }
      ]
    },
    {
      name: "Tools & Ecosystem",
      icon: <Wrench size={18} className="text-amber-400" />,
      skills: [
        { name: "Git", icon: "/icons/tech/git.svg" },
        { name: "GitHub", icon: "/icons/tech/github.svg" },
        { name: "Postman", icon: "/icons/tech/postman.svg" },
        { name: "Cloudinary", icon: "/icons/tech/cloudinary.svg" },
        { name: "React", icon: "/icons/tech/react.svg" }
      ]
    }
  ];

  return (
    <section id="tech-stack" className="tech-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Stack & Tooling</span>
            <h2 className="section-title">Technologies & Tools</h2>
            <p className="section-desc">
              Core technologies and industry frameworks powering my backend engineering, cloud workflows, and AI implementations.
            </p>
          </div>

          {/* Featured Core Technology Spotlight (Big Colorful Tiles) */}
          <div className="tech-spotlight-heading-row">
            <span className="tech-spotlight-label">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Core Engineering Stack</span>
            </span>
          </div>

          <div className="tech-spotlight-grid">
            {featuredStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <TiltCard maxTilt={10} scale={1.03} className="h-full">
                  <div 
                    className="tech-spotlight-card card h-full"
                    style={{ '--tech-glow': tech.glow, '--tech-accent': tech.color }}
                  >
                    <div className="tech-spotlight-header">
                      <div className="tech-spotlight-icon-wrap">
                        <img 
                          src={tech.icon} 
                          alt={`${tech.name} logo`} 
                          className="tech-spotlight-logo" 
                          loading="lazy" 
                        />
                      </div>
                      <span className="badge badge-accent tech-spotlight-badge">
                        {tech.badge}
                      </span>
                    </div>

                    <h3 className="tech-spotlight-name">{tech.name}</h3>
                    <p className="tech-spotlight-desc">{tech.role}</p>

                    <div className="tech-spotlight-glow-bar"></div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Detailed Categorized Skill Matrix with Colorful Icons */}
          <div className="tech-categories-grid">
            {categories.map((category, idx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.06 }}
              >
                <div className="tech-cat-card card h-full">
                  <div className="tech-cat-header">
                    <span className="tech-cat-icon">{category.icon}</span>
                    <h3 className="tech-cat-title">{category.name}</h3>
                  </div>

                  <div className="tech-pill-container">
                    {category.skills.map((skill) => (
                      <span key={skill.name} className="tech-pill tech-pill-colorful">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="tech-pill-icon" 
                          loading="lazy" 
                        />
                        <span className="tech-pill-text">{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
