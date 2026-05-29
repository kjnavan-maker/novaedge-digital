import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";


import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Process from "./components/Process";
import Packages from "./components/Packages";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import Customers from "./admin/pages/Customers";
import Inquiries from "./admin/pages/Inquiries";
import AdminServices from "./admin/pages/AdminServices";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminPortfolio from "./admin/pages/AdminPortfolio";


function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-400/20 blur-[120px] rounded-full" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-1/2 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full" />
      </div>

      <main className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-6 pt-24">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-300/20 bg-white/5 backdrop-blur-xl text-cyan-200"
            >
              <Sparkles size={16} />
              Premium Digital Growth Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight"
            >
              Elevating Brands{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
                Digitally.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="mt-8 text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-8"
            >
              Premium digital marketing, branding, websites, and creative
              technology solutions for modern businesses that want to stand out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#portfolio"
                className="group px-7 py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition flex items-center gap-2 shadow-[0_0_40px_rgba(103,232,249,0.35)]"
              >
                View Portfolio
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </a>

              <a
                href="https://wa.me/94764304068"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl hover:border-cyan-300/50 transition"
              >
                WhatsApp Us
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto"
            >
              {[
                ["Branding", "Premium identity systems"],
                ["Marketing", "Strategy-driven campaigns"],
                ["Websites", "Modern conversion-focused UI"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-cyan-300/40 transition"
                >
                  <h3 className="text-xl font-bold text-cyan-300">{title}</h3>
                  <p className="mt-2 text-white/50">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Services />
        <Portfolio />
        <About />
        <Process />
        <Packages />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/inquiries" element={<Inquiries />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/portfolio" element={<AdminPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;