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
  return (
    <section className="py-16 px-4 border-t border-[#1f521f]">
      <div className="max-w-6xl mx-auto">

        <div className="mb-2 text-xs font-mono text-[#1f521f]">greymint.kr:~$</div>
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E5E7AD] text-sm font-mono terminal-glow-amber">cat experience.log</span>
          <h2 className="mt-3 text-[#00FF62] text-2xl sm:text-3xl font-mono font-bold terminal-glow">
            // PROFESSIONAL EXPERIENCE
          </h2>
        </motion.div>

        <div className="border border-[#1f521f]">
          <div className="bg-[#0d2b0d] px-4 py-1.5 border-b border-[#1f521f] flex items-center justify-between">
            <span className="text-[#00FF62] text-xs font-mono terminal-glow-sm">experience.log</span>
            <span className="text-[#1f521f] text-xs font-mono">{items.length} entries</span>
          </div>

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-4 py-3 border-b border-[#0d2b0d] last:border-b-0 hover:bg-[#0d2b0d] transition-colors duration-150 group"
            >
              <span className="text-[#E5E7AD] text-xs font-mono w-32 flex-shrink-0 terminal-glow-amber">
                [{item.period}]
              </span>
              <span className="hidden sm:block text-[#1f521f] text-xs font-mono flex-shrink-0">····</span>
              <span className="text-[#00FF62] text-sm font-mono font-bold flex-1 terminal-glow-sm">
                {item.company}
              </span>
              <span className="hidden sm:block text-[#1f521f] text-xs font-mono flex-shrink-0">····</span>
              <span className="text-[#1f521f] text-xs font-mono group-hover:text-[#00FF62] transition-colors sm:text-right">
                {item.position}
              </span>
            </motion.div>
          ))}

          <div className="px-4 py-2 bg-[#0d2b0d]">
            <span className="text-[#1f521f] text-xs font-mono">-- END OF FILE --</span>
          </div>
        </div>

      </div>
    </section>
  );
}
