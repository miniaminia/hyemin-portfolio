import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  link: string;
}

interface WorksProps {
  projects: Project[];
}

export default function Works({ projects }: WorksProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(projects.map(p => p.category)));
  const filteredProjects = selectedCategory
    ? projects.filter(p => p.category === selectedCategory)
    : projects;

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Works
        </motion.h2>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
              selectedCategory === null
                ? "bg-mint-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-mint-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="mb-2 sm:mb-3 flex items-center justify-between">
                <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-mint-100 text-mint-700 text-xs font-semibold rounded-full">
                  {project.category}
                </span>
                <ExternalLink size={14} className="sm:w-4 sm:h-4 text-gray-400 group-hover:text-mint-600 transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {project.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
