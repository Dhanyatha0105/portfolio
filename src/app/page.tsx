"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroScreen from "@/components/HeroScreen";
import ProjectsScreen from "@/components/ProjectsScreen";
import TreeScreen from "@/components/TreeScreen";
import projectsData from "@/data/projects.json";

type Screen = "hero" | "projects" | "tree";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("hero");
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [transitioning, setTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<string | null>(null);

  const catRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);

  // Transition 1: Hero -> Projects (zoom into cat window)
  const handleHeroToProjects = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setTransitionPhase("hero-zoom");

    // Phase 1: Zoom into cat window (~600ms)
    setTimeout(() => {
      setTransitionPhase("hero-black");
      // Phase 2: Black screen then reveal projects
      setTimeout(() => {
        setCurrentScreen("projects");
        setTransitionPhase(null);
        setTransitioning(false);
      }, 400);
    }, 600);
  }, [transitioning]);

  // Transition 2: Projects -> Tree (zoom into flower yellow box)
  const handleProjectsToTree = useCallback(
    (domain: string) => {
      if (transitioning) return;
      setTransitioning(true);
      setSelectedDomain(domain);
      setTransitionPhase("flower-zoom");

      // Phase 1: Zoom into flower's yellow box (~500ms)
      setTimeout(() => {
        setTransitionPhase("flower-yellow");
        // Phase 2: Yellow fills, then fades to blue
        setTimeout(() => {
          setTransitionPhase("flower-blue");
          setTimeout(() => {
            setCurrentScreen("tree");
            setTransitionPhase(null);
            setTransitioning(false);
          }, 400);
        }, 400);
      }, 500);
    },
    [transitioning]
  );

  // Back from tree to projects
  const handleBackToProjects = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setTransitionPhase("tree-back");
    setTimeout(() => {
      setCurrentScreen("projects");
      setTransitionPhase(null);
      setTransitioning(false);
    }, 400);
  }, [transitioning]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Main content */}
      <AnimatePresence mode="wait">
        {currentScreen === "hero" && !transitionPhase && (
          <HeroScreen
            key="hero"
            onNavigate={handleHeroToProjects}
            catRef={catRef}
          />
        )}

        {currentScreen === "projects" && !transitionPhase && (
          <motion.div
            key="projects"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectsScreen
              projects={projectsData}
              onDomainClick={handleProjectsToTree}
              flowerRef={flowerRef}
            />
          </motion.div>
        )}

        {currentScreen === "tree" && !transitionPhase && (
          <motion.div
            key="tree"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TreeScreen
              domain={selectedDomain}
              projects={projectsData}
              onBack={handleBackToProjects}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlays */}
      <AnimatePresence>
        {/* Transition 1: Hero -> Projects (cat window zoom) */}
        {transitionPhase === "hero-zoom" && (
          <motion.div
            key="hero-zoom-overlay"
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "#FED177" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {/* Show hero content while zooming */}
            <HeroScreen
              onNavigate={() => {}}
              catRef={catRef}
            />
            {/* Dark overlay expanding from cat window position */}
            <motion.div
              className="absolute z-[60]"
              style={{
                backgroundColor: "#000",
                borderRadius: "8px",
                top: "25%",
                right: "8%",
                width: "12%",
                height: "20%",
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{
                scale: 20,
                opacity: 1,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {transitionPhase === "hero-black" && (
          <motion.div
            key="hero-black-overlay"
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Transition 2: Projects -> Tree (flower yellow box zoom) */}
        {transitionPhase === "flower-zoom" && (
          <motion.div
            key="flower-zoom-overlay"
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {/* Yellow square expanding from flower position */}
            <motion.div
              className="absolute z-[60]"
              style={{
                backgroundColor: "#FED177",
                top: "35%",
                right: "12%",
                width: "60px",
                height: "60px",
              }}
              initial={{ scale: 1 }}
              animate={{ scale: 30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {transitionPhase === "flower-yellow" && (
          <motion.div
            key="flower-yellow-overlay"
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "#FED177" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          />
        )}

        {transitionPhase === "flower-blue" && (
          <motion.div
            key="flower-blue-overlay"
            className="fixed inset-0 z-50"
            initial={{ backgroundColor: "#FED177" }}
            animate={{ backgroundColor: "#4E8FB3" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        )}

        {/* Transition: Tree -> Projects (simple fade) */}
        {transitionPhase === "tree-back" && (
          <motion.div
            key="tree-back-overlay"
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "#4E8FB3" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
