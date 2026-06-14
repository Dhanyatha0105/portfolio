"use client";

import { motion, AnimatePresence } from "framer-motion";
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

interface TreeScreenProps {
  domain: string;
  projects: Project[];
  onBack: () => void;
}

function TreeBranch({
  label,
  index,
  isExpanded,
  onClick,
  children,
}: {
  label: string;
  index: number;
  isExpanded: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
    >
      <div className="flex items-center">
        {/* Horizontal branch line */}
        <motion.div
          className="tree-branch-h"
          style={{ width: 60, height: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.15, duration: 0.4, ease: "easeOut" }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...({ style: { width: 60, height: 0, transformOrigin: "left" } } as any)}
        />

        {/* Leaf label */}
        <motion.button
          onClick={onClick}
          className="ml-4 text-white text-lg font-light uppercase tracking-[0.3em] cursor-pointer hover:text-yellow transition-colors whitespace-nowrap"
          style={{ fontFamily: "var(--font-inter)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: index * 0.15 + 0.2,
            duration: 0.3,
          }}
          whileHover={{ x: 8 }}
        >
          {label}
        </motion.button>
      </div>

      {/* Children (projects under this sub-area) */}
      <AnimatePresence>
        {isExpanded && children && (
          <motion.div
            className="ml-16 mt-2 mb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectLeaf({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <div className="flex items-center">
        {/* Sub-branch line */}
        <motion.div
          className="tree-branch-h"
          style={{ width: 40, height: 0, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        />
        <motion.button
          onClick={() => setShowDetail(!showDetail)}
          className="ml-3 text-white/80 text-sm font-light tracking-[0.15em] cursor-pointer hover:text-yellow transition-colors whitespace-nowrap"
          style={{ fontFamily: "var(--font-inter)" }}
          whileHover={{ x: 4 }}
        >
          {project.title}
        </motion.button>
        {project.liveUrl && (
          <span
            className="ml-2 text-xs px-2 py-0.5 rounded-full font-bold"
            style={{
              backgroundColor: "#FF1493",
              color: "#fff",
              fontSize: "0.65rem",
            }}
          >
            {project.isDemo ? "demo" : "live"}
          </span>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            className="ml-16 mt-3 mb-4 p-5 rounded-lg max-w-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white/90 text-sm mb-3 leading-relaxed">
              {project.oneLiner}
            </p>
            {project.metrics && (
              <p className="text-yellow text-xs mb-2 font-medium">
                📊 {project.metrics}
              </p>
            )}
            {project.notable && (
              <p className="text-hot-pink text-xs mb-2 font-bold">
                🏆 {project.notable}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(254,209,119,0.2)",
                    color: "#FED177",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold px-4 py-2 rounded-md transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#4E8FB3",
                    color: "#fff",
                  }}
                >
                  Live Demo →
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold px-4 py-2 rounded-md transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                GitHub →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TreeScreen({
  domain,
  projects,
  onBack,
}: TreeScreenProps) {
  const [expandedSubArea, setExpandedSubArea] = useState<string | null>(null);

  const subAreas = useMemo(() => {
    const map = new Map<string, Project[]>();
    projects
      .filter((p) => p.domain === domain)
      .forEach((p) => {
        const existing = map.get(p.subArea) || [];
        existing.push(p);
        map.set(p.subArea, existing);
      });
    return map;
  }, [domain, projects]);

  const subAreaKeys = Array.from(subAreas.keys());

  return (
    <motion.div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#4E8FB3" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="absolute top-6 left-8 text-white/70 text-sm font-medium cursor-pointer hover:text-white transition-colors z-10"
        style={{ fontFamily: "var(--font-inter)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ← Back to Projects
      </motion.button>

      {/* Domain title top-right */}
      <motion.h2
        className="absolute top-8 right-12 z-10"
        style={{
          fontFamily: "var(--font-anton)",
          fontSize: "clamp(3rem, 7vw, 6rem)",
          color: "#ffffff",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {domain}
      </motion.h2>

      {/* Tree structure */}
      <div className="flex-1 flex items-start pt-28 px-12 overflow-y-auto no-scrollbar">
        <div className="flex">
          {/* Vertical trunk */}
          <motion.div
            className="tree-branch-v relative"
            style={{
              minHeight: subAreaKeys.length * 120,
              marginTop: 10,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...({ style: { minHeight: subAreaKeys.length * 120, marginTop: 10, transformOrigin: "top" } } as any)}
          />

          {/* Branches */}
          <div className="flex flex-col justify-around" style={{ minHeight: subAreaKeys.length * 120 }}>
            {subAreaKeys.map((subArea, i) => (
              <TreeBranch
                key={subArea}
                label={subArea}
                index={i}
                isExpanded={expandedSubArea === subArea}
                onClick={() =>
                  setExpandedSubArea(
                    expandedSubArea === subArea ? null : subArea
                  )
                }
              >
                {/* Projects under this sub-area */}
                <div className="flex flex-col gap-2">
                  <div className="tree-branch-v ml-0" style={{ position: "relative" }}>
                    {(subAreas.get(subArea) || []).map((project, j) => (
                      <ProjectLeaf
                        key={project.id}
                        project={project}
                        index={j}
                      />
                    ))}
                  </div>
                </div>
              </TreeBranch>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
