import { motion } from "framer-motion";

interface ExpertiseItem {
  title: string;
  description: string;
}

interface ExpertiseProps {
  items: ExpertiseItem[];
}

export default function Expertise({ items }: ExpertiseProps) {
  return (
    <section className="py-16 px-4 border-t border-[#1f521f]">
      <div className="max-w-6xl mx-auto">

        <div className="mb-2 text-xs font-mono text-[#1f521f]">greymint.kr:~$</div>
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E5E7AD] text-sm font-mono terminal-glow-amber">cat capabilities.txt</span>
          <div className="mt-3 text-[#00FF62] text-2xl sm:text-3xl font-mono font-bold terminal-glow">
            // PROBLEM-SOLVING SPECIALIST
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-[#1f521f] hover:border-[#00FF62] transition-colors duration-300 group"
            >
              <div className="bg-[#0d2b0d] px-3 py-1.5 border-b border-[#1f521f] flex items-center justify-between group-hover:bg-[#1f521f] transition-colors duration-300">
                <span className="text-[#00FF62] text-xs font-mono terminal-glow-sm">
                  MODULE_{String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[#1f521f] text-xs font-mono group-hover:text-[#00FF62]">[+][−][×]</span>
              </div>
              <div className="p-5">
                <h3 className="text-[#00FF62] text-sm font-mono font-bold mb-3 terminal-glow-sm leading-snug">
                  {item.title}
                </h3>
                <div className="border-t border-dashed border-[#1f521f] mb-3" />
                <p className="text-[#1f521f] text-xs font-mono leading-relaxed group-hover:text-[#00FF62] transition-colors duration-300">
                  {item.description}
                </p>
              </div>
              <div className="px-3 py-1 border-t border-[#1f521f] flex items-center justify-between">
                <span className="text-[#1f521f] text-xs font-mono">[STATUS: OK]</span>
                <span className="text-[#1f521f] text-xs font-mono">{String(index + 1).padStart(2, "0")}/03</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
