import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "WORKS", href: "#works" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#1f521f]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-mono text-sm flex items-center gap-1">
          <span className="text-[#ffb000] terminal-glow-amber">~/백혜민</span>
          <span className="text-[#1f521f]"> $</span>
          <span className="cursor-blink text-[#33ff00] terminal-glow ml-1">█</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#33ff00] text-xs font-mono px-3 py-1.5 border border-transparent hover:border-[#33ff00] hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all duration-150 terminal-glow-sm"
            >
              [{item.label}]
            </a>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#33ff00] text-xs font-mono px-3 py-1.5 border border-[#1f521f] hover:border-[#33ff00] hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all duration-150"
        >
          {isOpen ? "[CLOSE]" : "[MENU]"}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-[#1f521f] bg-[#0a0a0a]">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-[#33ff00] text-xs font-mono px-2 py-2 hover:bg-[#0d2b0d] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-[#1f521f]">&gt;</span> {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
