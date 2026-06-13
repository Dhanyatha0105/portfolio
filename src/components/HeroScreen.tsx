"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroScreenProps {
  onNavigate: (target: string) => void;
  catRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroScreen({ onNavigate, catRef }: HeroScreenProps) {
  return (
    <motion.div
      className="w-full h-full flex flex-col"
      style={{ backgroundColor: "#FED177" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar - slightly darker strip */}
      <div
        className="w-full py-3 flex justify-end items-center px-12"
        style={{ backgroundColor: "#f5c55a" }}
      >
        <div className="flex gap-8">
          <button
            onClick={() => {}}
            className="text-3xl font-bold tracking-wide cursor-pointer"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#FF1493",
            }}
          >
            ABOUT
          </button>
          <button
            onClick={() => {}}
            className="text-3xl font-bold tracking-wide cursor-pointer"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#FF1493",
            }}
          >
            CONTACT!
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center px-12 relative">
        {/* Left: Name */}
        <div className="flex-1 z-10">
          <h1
            className="leading-[0.9] tracking-tight"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(6rem, 12vw, 12rem)",
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            DHANYATHA
            <br />
            CORRY
          </h1>
        </div>

        {/* Right: Cat image */}
        <div
          ref={catRef}
          className="absolute right-8 top-1/2 -translate-y-1/2"
          style={{ width: "clamp(300px, 30vw, 530px)" }}
        >
          <Image
            src="/cat.PNG"
            alt="Cat in window"
            width={530}
            height={442}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="px-12 pb-12 flex items-center gap-16 flex-wrap">
        <button
          onClick={() => onNavigate("projects")}
          className="nav-highlight cursor-pointer"
          style={{
            fontFamily: "var(--font-fredoka)",
            color: "#FF1493",
            fontSize: "1.25rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          VIEW 35+ PROJECTS
        </button>
        <a
          href="https://github.com/Dhanyatha0105"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#000000",
          }}
        >
          GITHUB
        </a>
        <button
          onClick={() => {}}
          className="text-lg font-bold uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#000000",
          }}
        >
          EXPERIENCE &nbsp;& ACHIEVEMENTS
        </button>
        <button
          onClick={() => {}}
          className="text-lg font-bold uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#000000",
          }}
        >
          RESUME
        </button>
      </div>
    </motion.div>
  );
}
