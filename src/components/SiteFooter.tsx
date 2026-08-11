import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface SiteFooterProps {
  title?: string;
  description?: string;
  showContributors?: boolean;
  maxWidth?: "max-w-6xl" | "max-w-7xl";
}

export function SiteFooter({
  title = "Thanks for Visiting!",
  description = "Open-source. Actively supported. Built for creators like you.",
  showContributors = false,
  maxWidth = "max-w-6xl",
}: SiteFooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="relative z-10 px-4 sm:px-6 lg:px-12 pb-12 sm:pb-24"
    >
      <div className={`${maxWidth} mx-auto rounded-3xl border border-gray-800/50 bg-gradient-to-b from-[#151518] to-[#121215] backdrop-blur-xl p-8 sm:p-12 text-center space-y-6 sm:space-y-8`}>
        <h2 className="text-2xl sm:text-3xl font-light text-white">
          <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4">
          <Button variant="flat" size="lg" as="a" href="https://github.com/Parsa3323" target="_blank" startContent={<Icon icon="mdi:github" className="w-5 h-5" />} className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
            GitHub
          </Button>
          {showContributors && (
            <Button variant="flat" size="lg" as="a" href="/#/contributors" startContent={<Icon icon="mdi:account-group" className="w-5 h-5" />} className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              Contributors
            </Button>
          )}
          <Button variant="flat" size="lg" as="a" href="https://docs.advancedarmorstands.ir" target="_blank" startContent={<Icon icon="mdi:book-open-variant" className="w-5 h-5" />} className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
            Documentation
          </Button>
        </div>
      </div>
    </motion.footer>
  );
}
