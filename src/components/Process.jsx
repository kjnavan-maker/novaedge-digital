import { motion } from "framer-motion";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    text: "We understand your business, audience, goals, competitors and brand direction.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    text: "We create premium visuals, content systems, UI layouts and brand experiences.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Launch",
    text: "We publish campaigns, launch websites and activate your digital presence.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Scale",
    text: "We track performance, improve strategy and help your brand grow digitally.",
  },
];

function Process() {
  return (
    <section id="process" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">
            OUR PROCESS
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-black">
            Strategy First. Growth Always.
          </h2>

          <p className="mt-5 text-white/55 max-w-2xl mx-auto text-lg">
            A clear workflow designed to turn ideas into premium digital
            experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 hover:border-cyan-300/40 hover:-translate-y-2 transition duration-300"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center">
                    <Icon className="text-cyan-300" size={26} />
                  </div>

                  <span className="text-5xl font-black text-white/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-bold">{step.title}</h3>

                <p className="mt-4 text-white/55 leading-7">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Process;