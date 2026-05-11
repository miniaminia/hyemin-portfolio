import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import NotionRenderer from "@/components/NotionRenderer";

function extractPageId(url: string): string {
  const match = url.match(/([a-f0-9]{32})/);
  if (!match) return "";
  const id = match[1];
  return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20)}`;
}

export default function ProjectDetail() {
  const { index } = useParams<{ index: string }>();
  const [, navigate] = useLocation();
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const project = portfolioData.projects[Number(index)];

  useEffect(() => {
    if (!project) { navigate("/"); return; }

    const pageId = extractPageId(project.link);
    if (!pageId) { setError("페이지 ID를 찾을 수 없습니다."); setLoading(false); return; }

    fetch(`/api/notion/${pageId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setBlocks(data.blocks);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [index, project, navigate]);

  useEffect(() => { window.scrollTo(0, 0); }, [index]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Back */}
        <motion.button
          onClick={() => navigate("/#works")}
          className="flex items-center gap-2 text-[#1f521f] hover:text-[#00FF62] text-xs font-mono mb-8 transition-colors duration-150 group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft size={12} />
          <span>cd ../works</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="mb-8 border border-[#1f521f] hover:border-[#00FF62] transition-colors duration-500"
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
              <span className="text-[#1f521f]">&gt; </span>{project.description}
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
          {loading && (
            <div className="flex items-center gap-2 text-[#1f521f] text-xs font-mono py-12">
              <span>loading content</span>
              <span className="cursor-blink text-[#00FF62]">█</span>
            </div>
          )}

          {error && (
            <div className="border border-[#1f521f] p-6">
              <p className="text-[#1f521f] text-xs font-mono">
                <span className="text-red-500">[ERROR]</span> {error}
              </p>
              <p className="text-[#1f521f] text-xs font-mono mt-2">
                &gt; 노션 페이지를 인테그레이션과 공유해주세요.
              </p>
            </div>
          )}

          {!loading && !error && <NotionRenderer blocks={blocks} />}
        </motion.div>

        {/* Footer prompt */}
        {!loading && !error && (
          <div className="mt-12 pt-6 border-t border-[#0d2b0d]">
            <span className="text-[#1f521f] text-xs font-mono">greymint.kr:~$ </span>
            <span className="cursor-blink text-[#00FF62] text-sm">█</span>
          </div>
        )}
      </div>
    </div>
  );
}
