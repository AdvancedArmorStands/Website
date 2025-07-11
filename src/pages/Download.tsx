import React, { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useReleases } from "../hooks/useReleases";
import { MarkdownPreview } from "../components/MarkdownPreview";
import MetaTags from "../components/MetaTags";

export default function Download() {
  const navigate = useNavigate();
  const { releases, loading, error } = useReleases();

  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden">
      <MetaTags 
        title="Download - AdvancedArmorStands"
        description="Download the latest version of AdvancedArmorStands plugin for Minecraft. Get changelogs and previous releases."
        url="https://advancedarmorstands.ir/#/download"
      />
      
      {/* Enhanced grid background that covers the entire page */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)] opacity-40" />
      
      {/* Additional subtle overlay for better visual depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-gray-950/40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-24 space-y-12 sm:space-y-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 sm:space-y-6"
        >
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight">
            <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
              Download
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed px-4">
            Get the latest builds and explore detailed changelogs for each release.
          </p>
        </motion.div>

        {/* Releases */}
        <div className="space-y-6 sm:space-y-8">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="inline-flex items-center gap-3 text-gray-400">
                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-light">Loading releases...</span>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="space-y-4">
                <Icon icon="mdi:alert-circle" className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-xl font-light text-white">Failed to load releases</h3>
                <p className="text-gray-400 font-light max-w-md mx-auto">
                  {error}
                </p>
                <Button
                  variant="bordered"
                  size="lg"
                  className="px-6 py-3 rounded-full border-2 border-gray-600 hover:border-white text-white hover:bg-white/5 transition-all duration-300"
                  onClick={() => window.location.reload()}
                  startContent={<Icon icon="mdi:refresh" className="w-5 h-5" />}
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          ) : releases.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="space-y-4">
                <Icon icon="mdi:package-variant" className="w-12 h-12 text-gray-500 mx-auto" />
                <h3 className="text-xl font-light text-white">No releases found</h3>
                <p className="text-gray-400 font-light">
                  No releases are currently available.
                </p>
              </div>
            </motion.div>
          ) : (
            releases.map((release, index) => (
              <motion.div
                key={release.tag_name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ReleaseCard release={release} />
              </motion.div>
            ))
          )}
        </div>

        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center pt-4 sm:pt-8 px-4"
        >
          <Button
            variant="bordered"
            size="lg"
            className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gray-600 hover:border-white text-white hover:bg-white/5 transition-all duration-300"
            onClick={() => navigate("/")}
            startContent={<Icon icon="mdi:arrow-left" className="w-5 h-5" />}
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 px-4 sm:px-6 lg:px-12 pb-12 sm:pb-24"
      >
        <div className="max-w-6xl mx-auto rounded-3xl border border-gray-800/50 bg-gradient-to-b from-[#151518] to-[#121215] backdrop-blur-xl p-8 sm:p-12 text-center space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white">
            <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
              Thanks for Visiting!
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Open-source. Actively supported. Built for creators like you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button
              variant="flat"
              size="lg"
              as="a"
              href="https://github.com/Parsa3323"
              target="_blank"
              startContent={<Icon icon="mdi:github" className="w-5 h-5" />}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              GitHub
            </Button>
            <Button
              variant="flat"
              size="lg"
              as="a"
              href="https://docs.advancedarmorstands.ir"
              target="_blank"
              startContent={<Icon icon="mdi:book-open-variant" className="w-5 h-5" />}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              Documentation
            </Button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

function ReleaseCard({ release }: { release: any }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Check if device is mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-3xl border border-gray-800/50 bg-gradient-to-b from-[#151518] to-[#121215] backdrop-blur-xl p-6 sm:p-8 hover:border-orange-500/30 transition-all duration-500 cursor-pointer overflow-hidden ${
        isMobile ? 'active:scale-[0.98]' : ''
      }`}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      {/* Spotlight effect - only on desktop */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 95, 21, 0.08), transparent 70%)`
          }}
        />
      )}
      
      <div className="relative z-10 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
          <div className="space-y-2 flex-1">
            <h2 className={`text-xl sm:text-2xl font-light text-white transition-colors duration-300 ${
              isMobile ? 'group-active:text-orange-500' : 'group-hover:text-orange-500'
            }`}>
              {release.name}
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base">
              {new Date(release.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <Button
            as="a"
            href={release.assets[0]?.browser_download_url}
            target="_blank"
            color="primary"
            size="lg"
            startContent={<Icon icon="mdi:download" className="w-5 h-5" />}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25 relative z-20"
          >
            Download
          </Button>
        </div>

        <div className="prose max-w-none prose-invert text-gray-400 text-sm sm:text-base [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>h4]:text-white [&>h5]:text-white [&>h6]:text-white [&>h1]:font-light [&>h2]:font-light [&>h3]:font-light [&>strong]:text-orange-500 [&>code]:bg-gray-800/50 [&>code]:text-orange-400 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded-md">
          <MarkdownPreview content={release.body} />
        </div>
      </div>
    </div>
  );
}