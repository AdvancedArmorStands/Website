import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import MetaTags from "../components/MetaTags";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onOpen: () => void;
  delay: number;
}

function FeatureCard({ icon, title, description, onOpen, delay }: FeatureCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

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
      className="group relative rounded-3xl border border-gray-800/50 bg-gradient-to-b from-gray-900/40 to-gray-950/60 backdrop-blur-xl p-8 hover:border-orange-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
      onMouseMove={handleMouseMove}
      onClick={onOpen}
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 95, 21, 0.1), transparent 70%)`
        }}
      />
      
      <div className="relative z-10 space-y-6">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-700/50 group-hover:border-orange-500/50 transition-colors duration-300">
          <img src={icon} alt={title} className="w-full h-full object-cover" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-light text-white group-hover:text-orange-500 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Parsa3323/AdvancedArmorStands/contributors")
      .then((res) => (res.ok ? res.json() : Promise.reject("API error")))
      .then((data) => (Array.isArray(data) ? setContributors(data) : Promise.reject("Format error")))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  const handleOpenModal = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContributor(null);
  };

  const handleConfirm = () => {
    if (selectedContributor) {
      window.open(selectedContributor.html_url, "_blank", "noopener,noreferrer");
      handleCloseModal();
    }
  };

  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden">
      <MetaTags />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 relative z-10 space-y-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-6xl font-light tracking-tight">
            <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
              Contributors
            </span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Meet the talented individuals who make AdvancedArmorStands possible.
          </p>
        </motion.div>

        {/* Contributors Grid */}
        <div className="space-y-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-red-400 text-lg font-light">Failed to load contributors.</p>
            </motion.div>
          )}
          
          {!contributors && !error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center gap-3 text-gray-400">
                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-light">Loading contributors...</span>
              </div>
            </motion.div>
          )}

          {contributors && (
            <div className="grid md:grid-cols-2 gap-8">
              {contributors.map((c, index) => (
                <FeatureCard
                  key={c.login}
                  icon={c.avatar_url}
                  title={c.login}
                  description="Contributor to AdvancedArmorStands"
                  onOpen={() => handleOpenModal(c)}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>

        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center pt-8"
        >
          <Button
            variant="bordered"
            size="lg"
            className="px-8 py-4 rounded-full border-2 border-gray-600 hover:border-white text-white hover:bg-white/5 transition-all duration-300"
            as="a"
            href="/"
            startContent={<Icon icon="mdi:arrow-left" className="w-5 h-5" />}
          >
            Back to Home
          </Button>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedContributor && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          classNames={{
            backdrop: "bg-black/80 backdrop-blur-sm",
            base: "border border-gray-800/50 bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-xl",
            header: "border-b border-gray-800/50",
            footer: "border-t border-gray-800/50",
          }}
        >
          <ModalContent>
            <ModalHeader className="text-white font-light text-xl">
              Confirm Action
            </ModalHeader>
            <ModalBody className="py-6">
              <p className="text-gray-300 font-light leading-relaxed">
                Are you sure you want to open {selectedContributor.login}'s GitHub profile?
              </p>
            </ModalBody>
            <ModalFooter className="gap-3">
              <Button 
                onClick={handleCloseModal} 
                variant="bordered"
                className="rounded-full border-gray-600 hover:border-white text-white hover:bg-white/5 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirm} 
                color="primary"
                className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </main>
  );
}