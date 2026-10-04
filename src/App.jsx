import React, { useState, useEffect } from 'react';
import ThreeCanvas3D from './components/ThreeCanvas3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Focus from './components/Focus';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import LinkedInPosts from './components/LinkedInPosts';
import Quotes from './components/Quotes';
import GitHubActivity from './components/GitHubActivity';
import LeetCode from './components/LeetCode';
import YouTube from './components/YouTube';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('argha-portfolio-theme');
    if (saved) return saved;
    // Default to dark mode
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('argha-portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="page-wrapper">
      {/* Global 3D Interactive Background across all sections */}
      <ThreeCanvas3D />
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main id="main-content">
        <Hero />
        <About />
        <Focus />
        <TechStack />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <LinkedInPosts />
        <Quotes />
        <GitHubActivity />
        <LeetCode />
        <YouTube />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
