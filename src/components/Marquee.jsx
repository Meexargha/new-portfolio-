import React from 'react';
import { Server, Brain, Cloud, Cpu, Code2, Sparkles, Terminal, Radio, Zap } from 'lucide-react';

export default function Marquee() {
  const items = [
    { text: "Backend Architecture", icon: <Server size={14} className="text-cyan-400" /> },
    { text: "Generative AI & LLMs", icon: <Brain size={14} className="text-violet-400" /> },
    { text: "Fastify & Appwrite", icon: <Zap size={14} className="text-pink-400" /> },
    { text: "Cloud & Docker / AWS", icon: <Cloud size={14} className="text-sky-400" /> },
    { text: "300+ LeetCode DSA", icon: <Code2 size={14} className="text-emerald-400" /> },
    { text: "IIIT Guwahati (IIITG)", icon: <Sparkles size={14} className="text-amber-400" /> },
    { text: "REST API Engineering", icon: <Terminal size={14} className="text-blue-400" /> },
    { text: "Redis & Distributed Stores", icon: <Cpu size={14} className="text-red-400" /> },
    { text: "6G RF Systems Research", icon: <Radio size={14} className="text-indigo-400" /> }
  ];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-icon">{item.icon}</span>
            <span className="marquee-text">{item.text}</span>
            <span className="marquee-separator">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
