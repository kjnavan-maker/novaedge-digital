import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-wide">
          <span className="text-cyan-300">NovaEdge</span>
          <span className="text-white"> Digital</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-white/70">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-cyan-300 transition">
              {link.name}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:block px-5 py-2 rounded-full bg-cyan-300 text-black font-semibold hover:bg-cyan-200 transition"
        >
          Start Project
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 bg-black/90 border-t border-white/10">
          <div className="flex flex-col gap-4 pt-5 text-white/70">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-5 py-3 rounded-full bg-cyan-300 text-black font-semibold text-center"
            >
              Start Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;