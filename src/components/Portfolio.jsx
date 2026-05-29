import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const staticProjects = [
  {
    title: "Luxury Brand Launch",
    category: "Branding",
    text: "Premium identity design for a modern business launch.",
  },
  {
    title: "DJ Event Promotion",
    category: "Event Marketing",
    text: "High-energy social media campaign for event promotion.",
  },
  {
    title: "Restaurant Social Campaign",
    category: "Social Media",
    text: "Creative content system for food and hospitality brands.",
  },
  {
    title: "Corporate Website UI",
    category: "Web Design",
    text: "Modern responsive UI design for professional companies.",
  },
];

function Portfolio() {
  const [adminProjects, setAdminProjects] = useState([]);

  useEffect(() => {
    fetchAdminProjects();
  }, []);

  const fetchAdminProjects = async () => {
    try {
      const response = await axios.get(
        "https://novaedge-digital.onrender.com/api/portfolio"
      );

      if (response.data.success) {
        const activeProjects = response.data.data.filter(
          (project) => project.status === "Active"
        );

        setAdminProjects(activeProjects);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="portfolio" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">
              PORTFOLIO
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-black">
              Selected Work
            </h2>
          </div>

          <p className="text-white/55 max-w-md text-lg">
            A premium showcase of branding, marketing and web experiences
            created for modern businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {staticProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-cyan-300/40 transition"
            >
              <div className="h-72 bg-gradient-to-br from-cyan-400/20 via-blue-600/20 to-purple-600/25 flex items-center justify-center overflow-hidden">
                <div className="w-28 h-28 rounded-full border border-cyan-300/30 shadow-[0_0_60px_rgba(103,232,249,0.25)] group-hover:scale-125 transition duration-700" />
              </div>

              <div className="p-7">
                <span className="inline-block px-4 py-1 rounded-full bg-cyan-300/10 border border-cyan-300/20 text-cyan-300 text-sm mb-4">
                  {project.category}
                </span>

                <h3 className="text-2xl font-bold">{project.title}</h3>

                <p className="mt-3 text-white/55 leading-7">{project.text}</p>

                <button className="mt-6 flex items-center gap-2 text-cyan-300 font-semibold group-hover:gap-4 transition-all">
                  View Case Study <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}

          {adminProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: (staticProjects.length + index) * 0.1,
              }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-cyan-300/40 transition"
            >
              {project.image ? (
                <div className="h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
              ) : (
                <div className="h-72 bg-gradient-to-br from-cyan-400/20 via-blue-600/20 to-purple-600/25 flex items-center justify-center overflow-hidden">
                  <div className="w-28 h-28 rounded-full border border-cyan-300/30 shadow-[0_0_60px_rgba(103,232,249,0.25)] group-hover:scale-125 transition duration-700" />
                </div>
              )}

              <div className="p-7">
                <span className="inline-block px-4 py-1 rounded-full bg-cyan-300/10 border border-cyan-300/20 text-cyan-300 text-sm mb-4">
                  {project.category}
                </span>

                <h3 className="text-2xl font-bold">{project.title}</h3>

                <p className="mt-3 text-white/55 leading-7">
                  {project.description}
                </p>

                {project.projectUrl ? (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 text-cyan-300 font-semibold group-hover:gap-4 transition-all"
                  >
                    View Project <ArrowRight size={18} />
                  </a>
                ) : (
                  <button className="mt-6 flex items-center gap-2 text-cyan-300 font-semibold group-hover:gap-4 transition-all">
                    View Case Study <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;