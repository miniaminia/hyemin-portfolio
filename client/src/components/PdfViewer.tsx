import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_PAGES = 20;
const getPageUrl = (n: number) =>
  `/portfolio/page-${String(n).zfill ? String(n).padStart(2, "0") : String(n).padStart(2, "0")}.jpg`;

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewer({ isOpen, onClose }: PdfViewerProps) {
  const [page, setPage] = useState(1);

  // Preload adjacent pages
  useEffect(() => {
    if (!isOpen) return;
    [page - 1, page, page + 1].forEach((p) => {
      if (p >= 1 && p <= TOTAL_PAGES) {
        const img = new Image();
        img.src = getPageUrl(p);
      }
    });
  }, [isOpen, page]);

  useEffect(() => {
    if (!isOpen) { setPage(1); return; }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        setPage(p => Math.min(p + 1, TOTAL_PAGES));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        setPage(p => Math.max(p - 1, 1));
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const block = (e: React.MouseEvent) => e.preventDefault();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onContextMenu={block}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0d2b0d] border-b border-[#1f521f] flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[#1f521f] text-xs font-mono">greymint.kr:~$</span>
              <span className="text-[#E5E7AD] text-xs font-mono terminal-glow-amber">open portfolio.pdf</span>
            </div>
            <button
              onClick={onClose}
              className="text-[#1f521f] hover:text-[#00FF62] transition-colors duration-150 font-mono text-xs flex items-center gap-1"
            >
              <X size={14} /> [ESC]
            </button>
          </div>

          {/* Image viewer */}
          <div className="flex-1 overflow-auto flex justify-center items-start bg-[#0a0a0a] p-4" onContextMenu={block}>
            <img
              key={page}
              src={getPageUrl(page)}
              alt={`포트폴리오 ${page}페이지`}
              className="max-w-full max-h-full object-contain shadow-lg select-none"
              onContextMenu={block}
              draggable={false}
            />
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-[#1f521f] bg-[#0a0a0a] flex items-center justify-between flex-shrink-0">
            <span className="text-[#1f521f] text-xs font-mono">[READ-ONLY]</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page <= 1}
                className="text-[#1f521f] hover:text-[#00FF62] disabled:opacity-30 transition-colors text-xs font-mono"
              >[PREV]</button>
              <span className="text-[#1f521f] text-xs font-mono">
                {String(page).padStart(2, "0")} / {String(TOTAL_PAGES).padStart(2, "0")}
              </span>
              <button
                onClick={() => setPage(p => Math.min(p + 1, TOTAL_PAGES))}
                disabled={page >= TOTAL_PAGES}
                className="text-[#1f521f] hover:text-[#00FF62] disabled:opacity-30 transition-colors text-xs font-mono"
              >[NEXT]</button>
            </div>
            <span className="text-[#1f521f] text-xs font-mono hidden sm:block">← → 키로 이동</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
