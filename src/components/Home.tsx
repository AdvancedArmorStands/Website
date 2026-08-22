import React, { useState, useRef } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MetaTags from "../components/MetaTags";

export default function Home() {
  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden">
      <MetaTags />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-12 py-32"
        >
          <div className="space-y-6">
            <h1 className="text-7xl sm:text-8xl font-light tracking-tight leading-none">
              <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent font-extralight">
                Advanced
              </span>
              <br />
              <span className="text-white font-thin">
                Armor Stands
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Create stunning armor stand animations for Minecraft with precision and elegance.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              startContent={<Icon icon="lucide:wand-2" className="w-5 h-5" />}
              as="a"
              href="https://animate.advancedarmorstands.ir"
              className="px-8 py-6 text-base font-medium rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-orange-500/25"
            >
              Create Animations
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="px-8 py-6 text-base font-medium rounded-full border-2 border-gray-600 hover:border-white text-white hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
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
          className="grid md:grid-cols-2 gap-8 py-24"
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

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 px-6 sm:px-8 lg:px-12 pb-24"
      >
        <div className="max-w-7xl mx-auto rounded-3xl border border-gray-800/50 bg-gradient-to-b from-[#151518] to-[#121215] backdrop-blur-xl p-12 text-center space-y-8">
          <h2 className="text-3xl font-light text-white">
            <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
              Built for Creators
            </span>
          </h2>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Open-source. Actively supported. Designed with the community in mind.
          </p>
          <div className="flex justify-center gap-6 pt-4">
            <Button
              variant="flat"
              size="lg"
              as="a"
              href="https://github.com/Parsa3323"
              target="_blank"
              startContent={<Icon icon="mdi:github" className="w-5 h-5" />}
              className="px-6 py-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              GitHub
            </Button>
            <Button
              variant="flat"
              size="lg"
              as="a"
              href="/#/contributors"
              startContent={<Icon icon="mdi:account-group" className="w-5 h-5" />}
              className="px-6 py-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              Contributors
            </Button>
            <Button
              variant="flat"
              size="lg"
              as="a"
              href="https://docs.advancedarmorstands.ir"
              target="_blank"
              startContent={<Icon icon="mdi:book-open-variant" className="w-5 h-5" />}
              className="px-6 py-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              Documentation
            </Button>
          </div>
        </div>
      </motion.div>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      ref={cardRef}
      className="group relative rounded-3xl border border-gray-800/50 bg-gradient-to-b from-[#151518] to-[#121215] backdrop-blur-xl p-8 hover:border-orange-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 95, 21, 0.1), transparent 70%)`
        }}
      />
      
      <div className="relative z-10 space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon icon={icon} className="w-7 h-7 text-orange-500" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-light text-white group-hover:text-orange-500 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 font-light leading-relaxed text-base">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
