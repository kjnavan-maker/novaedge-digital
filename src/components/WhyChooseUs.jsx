import { motion } from "framer-motion";
import { Crown, Zap, Brain, ShieldCheck, Clock, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: Crown,
    title: "Premium Creative Direction",
    text: "Every design is crafted to make your brand look modern, trusted and high-value.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    text: "Clean workflow and focused execution help us deliver projects faster.",
  },
  {
    icon: Brain,
    title: "AI & Technology Integration",
    text: "We combine creativity with modern tools, automation and smart digital solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Brand Positioning",
    text: "We help businesses move from basic online presence to premium digital identity.",
  },
  {
    icon: Clock,
    title: "Reliable Workflow",
    text: "Clear communication, updates and structured project management from start to finish.",
  },
  {
    icon: Sparkles,
    title: "Modern UI/UX Design",
    text: "Websites and interfaces are designed with smooth user experience and premium visuals.",
  },
];

function WhyChooseUs() {
  return (
    <section id="why-us" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">
            WHY CHOOSE US
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-black">
            Built For Premium Digital Growth
          </h2>

          <p className="mt-5 text-white/55 max-w-2xl mx-auto text-lg">
            NovaEdge Digital gives your business a modern, premium and strategic
            online presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 hover:border-cyan-300/40 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center mb-6">
                  <Icon className="text-cyan-300" size={26} />
                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-white/55 leading-7">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;