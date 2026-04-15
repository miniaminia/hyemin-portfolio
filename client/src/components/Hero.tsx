import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";

interface HeroProps {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
}

export default function Hero({
  name,
  title,
  subtitle,
  description,
  email
}: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-20 md:pb-20 px-4">
      <motion.div
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Content */}
        <div className="order-2 md:order-1">
          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-3 sm:mb-4 whitespace-pre-line">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium">{subtitle}</p>
          </motion.div>

          {/* Name and Description */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6">{name}</h2>
            <p className="text-base sm:text-lg md:text-lg text-gray-700 leading-relaxed max-w-2xl">
              {description}
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-mint-600 transition-colors duration-300 text-sm sm:text-base"
            >
              <Mail size={18} className="sm:w-5 sm:h-5" />
              <span className="font-medium truncate">{email}</span>
            </a>
            <a
              href="/portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 bg-mint-600 text-white hover:bg-mint-700 transition-colors duration-300 rounded-lg text-sm sm:text-base font-medium"
            >
              <FileText size={18} className="sm:w-5 sm:h-5" />
              <span>Portfolio PDF</span>
            </a>
          </motion.div>
        </div>

        {/* Right: Profile Image */}
        <motion.div variants={itemVariants} className="flex justify-center md:justify-end order-1 md:order-2 mb-8 md:mb-0">
          <img
            src="/images/profile.jpg"
            alt={name}
            className="w-full max-w-xs sm:max-w-sm md:max-w-sm rounded-2xl shadow-lg object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
