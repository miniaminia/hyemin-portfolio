import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

interface ContactProps {
  email: string;
}

export default function Contact({ email }: ContactProps) {
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
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          >
            Let's build something great together.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"
          >
            새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으신가요? 언제든지 연락주세요.
          </motion.p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          className="flex justify-center mb-8 sm:mb-10 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.a
            variants={itemVariants}
            href={`mailto:${email}`}
            className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm sm:text-base md:text-lg"
          >
            <Mail size={20} className="sm:w-6 sm:h-6" />
            <span className="font-medium">{email}</span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.a
            variants={itemVariants}
            href="https://www.linkedin.com/in/hyemin-baek-253b62156/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:p-3 bg-gray-800 hover:bg-green-600 rounded-full transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <Linkedin size={20} className="sm:w-6 sm:h-6" />
          </motion.a>

        </motion.div>

        {/* Footer */}
        <motion.div
          className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm">
            © 2026 Hyemin Baek
          </p>
        </motion.div>
      </div>
    </section>
  );
}
