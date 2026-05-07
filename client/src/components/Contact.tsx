import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

interface ContactProps {
  email: string;
}

export default function Contact({ email }: ContactProps) {
  return (
    <section id="contact" className="py-16 px-4 border-t border-[#1f521f]">
      <div className="max-w-6xl mx-auto">

        <div className="mb-2 text-xs font-mono text-[#1f521f]">greymint.kr:~$</div>
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E5E7AD] text-sm font-mono terminal-glow-amber">./connect.sh</span>
          <h2 className="mt-3 text-[#00FF62] text-2xl sm:text-3xl font-mono font-bold terminal-glow">
            // LET'S BUILD SOMETHING GREAT
          </h2>
        </motion.div>

        <motion.div
          className="border border-[#1f521f] max-w-2xl hover:border-[#00FF62] transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#0d2b0d] px-4 py-1.5 border-b border-[#1f521f] flex items-center gap-2">
            <span className="text-[#00FF62] text-xs font-mono terminal-glow-sm">connect.sh</span>
            <span className="text-[#1f521f] text-xs font-mono ml-auto">[RUNNING]</span>
          </div>

          <div className="p-6 space-y-3">
            <p className="text-[#1f521f] text-sm font-mono">
              &gt; 새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으신가요?
            </p>
            <p className="text-[#1f521f] text-sm font-mono">
              &gt; 언제든지 연락주세요.
            </p>

            <div className="border-t border-dashed border-[#1f521f] pt-4 space-y-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-[#00FF62] text-sm font-mono px-3 py-2 hover:bg-[#00FF62] hover:text-[#0a0a0a] transition-all duration-150 terminal-glow-sm group"
              >
                <Mail size={14} />
                <span>$ mail {email}</span>
              </a>
              <a
                href="https://www.linkedin.com/in/hyemin-baek-253b62156/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#1f521f] text-sm font-mono px-3 py-2 hover:bg-[#0d2b0d] hover:text-[#00FF62] transition-all duration-150 group"
              >
                <Linkedin size={14} />
                <span>$ open linkedin/hyemin-baek</span>
              </a>
            </div>
          </div>

          <div className="px-4 py-2 border-t border-[#1f521f] flex items-center gap-2">
            <span className="text-[#1f521f] text-xs font-mono">greymint.kr:~$</span>
            <span className="cursor-blink text-[#00FF62] text-sm">█</span>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 pt-6 border-t border-[#0d2b0d] text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[#1f521f] text-xs font-mono">
            © 2026 백혜민 &nbsp;--&nbsp; [EOF]
          </p>
        </motion.div>

      </div>
    </section>
  );
}
