import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { projectContent } from "@/data/projectContent";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-[#E5E7AD] text-base font-mono font-bold mb-3 terminal-glow-amber">
        ## {label}
      </h2>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm font-mono text-[#9fffce] leading-relaxed">
          <span className="text-[#1f521f] flex-shrink-0">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const { index } = useParams<{ index: string }>();
  const [, navigate] = useLocation();

  const i = Number(index);
  const project = portfolioData.projects[i];
  const content = projectContent[i];

  useEffect(() => { window.scrollTo(0, 0); }, [index]);

  if (!project || !content) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Back */}
        <motion.button
          onClick={() => navigate("/#works")}
          className="flex items-center gap-2 text-[#1f521f] hover:text-[#00FF62] text-xs font-mono mb-8 transition-colors duration-150"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft size={12} />
          <span>cd ../works</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="mb-10 border border-[#1f521f] hover:border-[#00FF62] transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-[#0d2b0d] px-4 py-2 border-b border-[#1f521f] flex items-center justify-between">
            <span className="text-[#1f521f] text-xs font-mono">greymint.kr:~$ cat project.md</span>
            <span className="text-[#E5E7AD] text-xs font-mono terminal-glow-amber">[{project.category.toUpperCase()}]</span>
          </div>
          <div className="p-6">
            <h1 className="text-[#00FF62] text-2xl sm:text-3xl font-mono font-bold terminal-glow leading-snug mb-3">
              {project.title}
            </h1>
            <p className="text-[#1f521f] text-sm font-mono">
              <span>&gt; </span>{project.description}
            </p>
          </div>
          <div className="px-4 py-2 border-t border-[#1f521f]">
            <span className="text-[#1f521f] text-xs font-mono">[OK] 1 file loaded</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Section label="프로젝트 개요">
            <p className="flex gap-2 text-sm font-mono text-[#9fffce] leading-relaxed">
              <span className="text-[#1f521f] flex-shrink-0">&gt;</span>
              <span>{content.overview}</span>
            </p>
          </Section>

          <div className="border-t border-dashed border-[#1f521f] mb-8" />

          <Section label="작업 목표">
            <BulletList items={content.goals} />
          </Section>

          <div className="border-t border-dashed border-[#1f521f] mb-8" />

          <Section label="문제 해결">
            <BulletList items={content.solution} />
          </Section>

          <div className="border-t border-dashed border-[#1f521f] mb-8" />

          <Section label="성과">
            <BulletList items={content.results} />
          </Section>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-[#0d2b0d]">
          <span className="text-[#1f521f] text-xs font-mono">greymint.kr:~$ </span>
          <span className="cursor-blink text-[#00FF62] text-sm">█</span>
        </div>
      </div>
    </div>
  );
}
