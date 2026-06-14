"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";

interface Project {
  id: string;
  title: string;
  domain: string;
  subArea: string;
  oneLiner: string;
  tech: string[];
  metrics: string;
  notable: string;
  githubUrl: string;
  liveUrl: string;
  isDemo: boolean;
}

interface ProjectsScreenProps {
  projects: Project[];
  onDomainClick: (domain: string) => void;
  flowerRef: React.RefObject<HTMLDivElement | null>;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ProjectsScreen({
  projects,
  onDomainClick,
  flowerRef,
}: ProjectsScreenProps) {
  const [search, setSearch] = useState("");

  const domains = useMemo(() => {
    const domainSet = new Set(projects.map((p) => p.domain));
    return Array.from(domainSet);
  }, [projects]);

  const filteredDomains = useMemo(() => {
    if (!search.trim()) return domains;
    return domains.filter((d) =>
      d.toLowerCase().includes(search.toLowerCase())
    );
  }, [domains, search]);

  return (
    <motion.div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top section */}
      <div className="flex-1 flex flex-col px-12 pt-8 relative">
        {/* Title and Search row */}
        <div className="flex justify-between items-start">
          <motion.div variants={itemVariants}>
            <h2
              className="leading-none"
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(4rem, 8vw, 7rem)",
                color: "#FED177",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              PROJECTS...
            </h2>
          </motion.div>

          {/* Search pill */}
          <motion.div variants={itemVariants} className="mt-2">
            <div className="search-pill flex items-center gap-3">
              <svg
                className="absolute left-4 w-5 h-5"
                fill="none"
                stroke="#1a1a4e"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="SEARCH ANY DOMAIN"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none font-bold text-navy placeholder-navy/60 w-48"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#1a1a4e",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-2 text-sm font-bold uppercase tracking-[0.2em]"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#FED177",
          }}
        >
          35+ PROJECTS SPANNING ACROSS 7+ DOMAINS
        </motion.p>

        {/* Domain cards grid + flower */}
        <div className="flex mt-8 gap-8 flex-1">
          {/* Cards grid */}
          <motion.div
            className="grid grid-cols-3 gap-6 auto-rows-min"
            variants={containerVariants}
          >
            {filteredDomains.map((domain) => (
              <motion.button
                key={domain}
                variants={itemVariants}
                onClick={() => onDomainClick(domain)}
                className="domain-card cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {domain}
              </motion.button>
            ))}
          </motion.div>

          {/* Flower image */}
          <motion.div
            ref={flowerRef}
            variants={itemVariants}
            className="flex-shrink-0 ml-auto self-start"
            style={{ width: "clamp(180px, 18vw, 280px)" }}
          >
            <Image
              src="/flower.png"
              alt="Flower with yellow box"
              width={261}
              height={338}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Hot banner at bottom */}
      <motion.div
        variants={itemVariants}
        className="w-full"
      >
        <div className="flex items-center px-8 py-4">
          {/* hot! text */}
          <span
            className="text-5xl italic mr-6 flex-shrink-0"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#FF1493",
            }}
          >
            hot!
          </span>

          {/* Banner content */}
          <div
            className="hot-banner flex-1 flex items-center gap-0 py-4 px-8 rounded-sm"
          >
            {/* AGI Research */}
            <div className="flex-1 pr-6 border-r-2 border-navy/30">
              <h3
                className="text-xl font-black uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-anton)",
                  color: "#c62828",
                  letterSpacing: "0.1em",
                }}
              >
                AGI - RESEARCH
              </h3>
              <p
                className="text-sm italic mt-1"
                style={{
                  fontFamily: "var(--font-fredoka)",
                  color: "#1a1a4e",
                }}
              >
                Paper Ready to be published
              </p>
            </div>

            {/* Sentinel Graph */}
            <div className="flex-1 pl-6">
              <h3
                className="text-xl font-black uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-anton)",
                  color: "#1a1a4e",
                  letterSpacing: "0.1em",
                }}
              >
                SENTINEL-GRAPH
              </h3>
              <p
                className="text-sm italic mt-1"
                style={{
                  fontFamily: "var(--font-fredoka)",
                  color: "#1a1a4e",
                }}
              >
                Atos Hackathon - Top Performer
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
