function Footer() {
  return (
    <footer className="relative z-10 px-6 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div>
          <h2 className="text-2xl font-black">
            <span className="text-cyan-300">NovaEdge</span> Digital
          </h2>
          <p className="mt-2 text-white/45">
            Design. Strategy. Growth.
          </p>
        </div>

        <div className="flex items-center gap-6 text-white/55">
          <a href="#services" className="hover:text-cyan-300 transition">Services</a>
          <a href="#portfolio" className="hover:text-cyan-300 transition">Portfolio</a>
          <a href="#contact" className="hover:text-cyan-300 transition">Contact</a>
        </div>

        <p className="text-white/40">
          © 2026 NovaEdge Digital
        </p>

      </div>
    </footer>
  );
}

export default Footer;