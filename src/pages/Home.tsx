import React, { useState, useRef } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MetaTags from "../components/MetaTags";
import { SiteFooter } from "../components/SiteFooter";

export default function Home() {
  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden">
      <MetaTags />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-24 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 sm:space-y-12 py-16 sm:py-32"
        >
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none">
              <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent font-extralight">
                Advanced
              </span>
              <br />
              <span className="text-white font-thin">
                Armor Stands
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
              Create stunning armor stand animations for Minecraft with precision and elegance.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center items-center pt-4 sm:pt-8 px-4"
          >
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              startContent={<Icon icon="lucide:wand-2" className="w-5 h-5" />}
              as={Link}
              to="/animate"
              className="gradient-button w-full sm:w-auto px-8 py-6 text-base font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-orange-500/25"
            >
              Create Animations
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="w-full sm:w-auto px-8 py-6 text-base font-medium rounded-full border-2 border-gray-600 hover:border-white text-white hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              startContent={<Icon icon="lucide:download" className="w-5 h-5" />}
              as={Link}
              to="/download"
            >
              Download
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 py-12 sm:py-24 px-4"
        >
          <FeatureCard
            icon="lucide:wand-2"
            title="Intuitive Design"
            description="Crafted with simplicity in mind. Create complex animations with just a few clicks."
            delay={0.1}
          />
          <FeatureCard
            icon="lucide:layers"
            title="Universal Compatibility"
            description="Seamlessly supports Minecraft versions 1.8 through 1.21 and beyond."
            delay={0.2}
          />
          <FeatureCard
            icon="lucide:headset"
            title="Continuous Innovation"
            description="Regular updates and dedicated community support ensure you're always ahead."
            delay={0.3}
          />
          <FeatureCard
            icon="lucide:settings"
            title="Open Source"
            description="Transparent, community-driven development. Modify and extend as you see fit."
            delay={0.4}
          />
        </motion.div>
      </div>

      <SiteFooter title="Built for Creators" description="Open-source. Actively supported. Designed with the community in mind." showContributors maxWidth="max-w-7xl" />
    </main>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
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
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      ref={cardRef}
      className={`group relative rounded-3xl border border-gray-800/50 bg-gradient-to-b from-[#151518] to-[#121215] backdrop-blur-xl p-6 sm:p-8 hover:border-orange-500/30 transition-all duration-500 cursor-pointer overflow-hidden w-full text-left ${
        isMobile ? 'active:scale-95 active:bg-orange-500/5' : ''
      }`}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      {/* Spotlight effect - only on desktop */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 95, 21, 0.1), transparent 70%)`
          }}
        />
      )}
      
      <div className="relative z-10 space-y-4 sm:space-y-6">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center transition-transform duration-300 ${
          isMobile ? 'group-active:scale-110' : 'group-hover:scale-110'
        }`}>
          <Icon icon={icon} className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <h3 className={`text-xl sm:text-2xl font-light text-white transition-colors duration-300 ${
            isMobile ? 'group-active:text-orange-500' : 'group-hover:text-orange-500'
          }`}>
            {title}
          </h3>
          <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
