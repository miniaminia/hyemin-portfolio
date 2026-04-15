import { motion } from "framer-motion";

interface ExperienceItem {
  period: string;
  company: string;
  position: string;
}

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>

        <motion.div
          className="space-y-4 sm:space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-200 last:border-b-0"
            >
              <div className="sm:w-24 flex-shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-mint-600">
                  {item.period}
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {item.company}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{item.position}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
