import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://novaedge-digital.onrender.com/api/services"
      );

      if (response.data.success) {
        setServices(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      id="services"
      className="relative z-10 px-6 py-24 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">
            SERVICES
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
            Premium Digital Solutions
          </h2>

          <p className="mt-6 text-white/55 text-lg max-w-3xl mx-auto leading-8">
            We help brands grow with premium digital experiences,
            modern marketing strategies, and high-end creative
            solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services
            .filter((service) => service.status === "Active")
            .map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 hover:border-cyan-300/40 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center text-cyan-300 text-2xl font-black">
                  {index + 1}
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-4 text-white/55 leading-7">
                  {service.description}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Services;