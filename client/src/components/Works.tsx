import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

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
  const [, navigate] = useLocation();

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filteredProjects = selectedCategory
    ? projects.map((p, i) => ({ ...p, originalIndex: i })).filter((p) => p.category === selectedCategory)
    : projects.map((p, i) => ({ ...p, originalIndex: i }));

  return (
    <section className="py-16 px-4 border-t border-[#1f521f]">
      <div className="max-w-6xl mx-auto">

        <div className="mb-2 text-xs font-mono text-[#1f521f]">greymint.kr:~$</div>
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E5E7AD] text-sm font-mono terminal-glow-amber">ls -la ./works/</span>
          <h2 className="mt-3 text-[#00FF62] text-2xl sm:text-3xl font-mono font-bold terminal-glow">
            // WORKS
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 text-xs font-mono border transition-all duration-150 ${
              selectedCategory === null
                ? "bg-[#00FF62] text-[#0a0a0a] border-[#00FF62]"
                : "text-[#1f521f] border-[#1f521f] hover:border-[#00FF62] hover:text-[#00FF62]"
            }`}
          >
            --all
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-mono border transition-all duration-150 ${
                selectedCategory === cat
                  ? "bg-[#00FF62] text-[#0a0a0a] border-[#00FF62]"
                  : "text-[#1f521f] border-[#1f521f] hover:border-[#00FF62] hover:text-[#00FF62]"
              }`}
            >
              --{cat.toLowerCase()}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              onClick={() => navigate(`/project/${project.originalIndex}`)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
              viewport={{ once: true }}
              className="border border-[#1f521f] hover:border-[#00FF62] transition-all duration-200 group cursor-pointer hover-glitch"
            >
              <div className="bg-[#0d2b0d] px-3 py-1.5 border-b border-[#1f521f] flex items-center justify-between group-hover:bg-[#1f521f] transition-colors duration-200">
                <span className="text-[#1f521f] text-xs font-mono group-hover:text-[#00FF62] transition-colors">
                  [{project.category.toUpperCase()}]
                </span>
                <ArrowRight size={11} className="text-[#1f521f] group-hover:text-[#00FF62] transition-colors" />
              </div>
              <div className="p-4">
                <h3 className="text-[#00FF62] text-sm font-mono font-bold mb-2 terminal-glow-sm leading-snug">
                  {project.title}
                </h3>
                <p className="text-[#1f521f] text-xs font-mono leading-relaxed group-hover:text-[#00FF62] transition-colors duration-200">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-[#1f521f] text-xs font-mono">
          &gt; {filteredProjects.length} results found
          <span className="cursor-blink ml-1">_</span>
        </div>

      </div>
    </section>
  );
}
