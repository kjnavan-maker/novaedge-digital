import { useEffect, useState } from "react";
import axios from "axios";
import {
  Palette,
  Megaphone,
  LineChart,
  Code2,
  PenTool,
  Video,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const staticServices = [
  {
    icon: Palette,
    title: "Brand Identity Design",
    text: "Premium logo systems, colors, typography and full visual identity.",
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    text: "Modern content planning, page management and creative direction.",
  },
  {
    icon: LineChart,
    title: "Meta Ads Campaigns",
    text: "Facebook and Instagram ads designed to reach the right audience.",
  },
  {
    icon: Code2,
    title: "Website Development",
    text: "Fast, responsive and premium websites for modern businesses.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    text: "Clean interfaces that build trust and improve user experience.",
  },
  {
    icon: Video,
    title: "Reels Editing",
    text: "Cinematic reels, launch videos and social media visual content.",
  },
];

function Services() {
  const [extraServices, setExtraServices] = useState([]);

  useEffect(() => {
    fetchExtraServices();
  }, []);

  const fetchExtraServices = async () => {
    try {
      const response = await axios.get(
        "https://novaedge-digital.onrender.com/api/services"
      );

      if (response.data.success) {
        const activeServices = response.data.data.filter(
          (service) => service.status === "Active"
        );

        setExtraServices(activeServices);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="services" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">
            SERVICES
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-black">
            What We Create
          </h2>

          <p className="mt-5 text-white/55 max-w-2xl mx-auto text-lg">
            Premium digital solutions built to make your brand look powerful,
            professional and unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 hover:border-cyan-300/40 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_35px_rgba(103,232,249,0.35)] transition">
                  <Icon className="text-cyan-300" size={26} />
                </div>

                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>

                <p className="text-white/55 leading-7">{service.text}</p>
              </motion.div>
            );
          })}

          {extraServices.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: (staticServices.length + index) * 0.08,
              }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 hover:border-cyan-300/40 hover:-translate-y-2 transition duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_35px_rgba(103,232,249,0.35)] transition">
                <Sparkles className="text-cyan-300" size={26} />
              </div>

              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>

              <p className="text-white/55 leading-7">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;