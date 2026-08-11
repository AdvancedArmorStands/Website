import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg space-y-8"
      >
        <motion.h1 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-9xl font-extralight bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent mb-8"
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <p className="text-2xl font-light text-gray-300 leading-relaxed">
            The page you're looking for doesn't exist.
          </p>
          <p className="text-lg text-gray-400 font-light">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            size="lg"
            variant="shadow"
            color="primary"
            as={Link}
            to="/"
            startContent={<Icon icon="mdi:home" className="w-5 h-5" />}
            className="gradient-button px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-orange-500/25"
          >
            Go Home
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
