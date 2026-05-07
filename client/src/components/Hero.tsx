import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";

function useTypewriter(text: string, speed = 70, delay = 600) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return displayed;
}

interface HeroProps {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
}

export default function Hero({ name, description, email }: HeroProps) {
  const typedTitle = useTypewriter("UI/UX\n디자이너", 80, 800);
  const isDone = typedTitle.length >= "UI/UX\n디자이너".length;

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
      <div className="max-w-3xl w-full">

        {/* Left: Content */}
        <div>

          {/* whoami prompt */}
          <motion.div
            className="mb-3 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#1f521f]">greymint.kr:~$ </span>
            <span className="text-[#ffb000] terminal-glow-amber">whoami</span>
          </motion.div>

          {/* Name */}
          <motion.div
            className="mb-6 text-[#33ff00] text-3xl sm:text-4xl font-mono font-bold terminal-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {name}
          </motion.div>

          {/* cat title prompt */}
          <motion.div
            className="mb-2 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-[#1f521f]">greymint.kr:~$ </span>
            <span className="text-[#ffb000] terminal-glow-amber">cat title.txt</span>
          </motion.div>

          {/* Title typewriter */}
          <div className="mb-8 text-[#33ff00] text-5xl sm:text-6xl md:text-7xl font-mono font-bold whitespace-pre-line leading-tight terminal-glow">
            {typedTitle}
            {!isDone && <span className="cursor-blink">█</span>}
            {isDone && <span className="cursor-blink">█</span>}
          </div>

          {/* cat about prompt */}
          <motion.div
            className="mb-2 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-[#1f521f]">greymint.kr:~$ </span>
            <span className="text-[#ffb000] terminal-glow-amber">cat about.txt</span>
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-8 border-l-2 border-[#1f521f] pl-4 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {description.split("\n").map((line, i) => (
              <p key={i} className="text-[#33ff00] text-sm font-mono leading-relaxed terminal-glow-sm">
                <span className="text-[#1f521f]">&gt; </span>{line}
              </p>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#33ff00] text-[#33ff00] text-xs font-mono hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all duration-150 terminal-glow-sm"
            >
              <Mail size={14} />
              [ SEND_MAIL ]
            </a>
            <a
              href="/portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#ffb000] text-[#ffb000] text-xs font-mono hover:bg-[#ffb000] hover:text-[#0a0a0a] transition-all duration-150 terminal-glow-amber"
            >
              <FileText size={14} />
              [ VIEW_PDF ]
            </a>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
