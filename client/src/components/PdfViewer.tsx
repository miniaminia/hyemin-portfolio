import { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewer({ isOpen, onClose }: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1.2);

  // Load PDF
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setCurrentPage(1);
    pdfjsLib.getDocument("https://www.greymint.kr/portfolio.pdf").promise
      .then((doc) => {
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setLoading(false);
      });
    return () => setPdfDoc(null);
  }, [isOpen]);

  // Render page
  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return;
    if (renderTaskRef.current) renderTaskRef.current.cancel();

    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const task = page.render({ canvasContext: ctx, viewport });
    renderTaskRef.current = task;
    await task.promise.catch(() => {});
  }, [pdfDoc, scale]);

  useEffect(() => { renderPage(currentPage); }, [currentPage, renderPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        setCurrentPage(p => Math.min(p + 1, totalPages));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        setCurrentPage(p => Math.max(p - 1, 1));
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, totalPages]);

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

          {/* Canvas */}
          <div className="flex-1 overflow-auto flex justify-center bg-[#0a0a0a] p-4" onContextMenu={block}>
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <span className="text-[#1f521f] text-xs font-mono">loading portfolio.pdf</span>
                <span className="cursor-blink text-[#00FF62] ml-1">█</span>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                className="max-w-full shadow-lg"
                onContextMenu={block}
                style={{ userSelect: "none" }}
              />
            )}
          </div>

          {/* Footer navigation */}
          <div className="px-4 py-2 border-t border-[#1f521f] bg-[#0a0a0a] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScale(s => Math.max(0.6, +(s - 0.2).toFixed(1)))}
                className="text-[#1f521f] hover:text-[#00FF62] transition-colors text-xs font-mono"
              >[−]</button>
              <span className="text-[#1f521f] text-xs font-mono w-10 text-center">{Math.round(scale * 100)}%</span>
              <button
                onClick={() => setScale(s => Math.min(2.5, +(s + 0.2).toFixed(1)))}
                className="text-[#1f521f] hover:text-[#00FF62] transition-colors text-xs font-mono"
              >[+]</button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage <= 1}
                className="text-[#1f521f] hover:text-[#00FF62] disabled:opacity-30 transition-colors text-xs font-mono"
              >[PREV]</button>
              <span className="text-[#1f521f] text-xs font-mono">
                {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage >= totalPages}
                className="text-[#1f521f] hover:text-[#00FF62] disabled:opacity-30 transition-colors text-xs font-mono"
              >[NEXT]</button>
            </div>

            <span className="text-[#1f521f] text-xs font-mono">[READ-ONLY]</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
