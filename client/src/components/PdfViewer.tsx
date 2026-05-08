import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_PAGES = 19;
const getPageUrl = (n: number) => `/portfolio/page-${String(n).padStart(2, "0")}.jpg`;

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewer({ isOpen, onClose }: PdfViewerProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
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

          {/* Scroll viewer */}
          <div
            className="flex-1 overflow-y-auto bg-[#0a0a0a] py-6"
            onContextMenu={block}
          >
            <div className="flex flex-col items-center gap-2 w-full max-w-3xl mx-auto px-4">
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((n) => (
                <img
                  key={n}
                  src={getPageUrl(n)}
                  alt={`포트폴리오 ${n}페이지`}
                  className="w-full block select-none shadow-md shadow-[#1f521f]/20"
                  onContextMenu={block}
                  draggable={false}
                  loading={n <= 2 ? "eager" : "lazy"}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-1.5 border-t border-[#1f521f] bg-[#0a0a0a] flex-shrink-0">
            <span className="text-[#1f521f] text-xs font-mono">[READ-ONLY] portfolio · {TOTAL_PAGES} pages</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
