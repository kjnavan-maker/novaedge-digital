import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Client Name",
    role: "Business Owner",
    review:
      "NovaEdge Digital created a premium brand look for our business. The design quality and communication were excellent.",
  },
  {
    name: "Client Name",
    role: "Startup Founder",
    review:
      "Their website design and marketing ideas helped us look more professional online.",
  },
  {
    name: "Client Name",
    role: "Event Organizer",
    review:
      "The social media creatives were modern, eye-catching and perfect for our campaign.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">
            TESTIMONIALS
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black">
            What Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8"
            >
              <div className="flex gap-1 text-cyan-300 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-white/65 leading-8">
                “{item.review}”
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-white/45">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;