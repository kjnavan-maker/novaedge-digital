import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Starter",
    price: "Custom",
    features: ["12 social media posts", "4 reels", "Basic page management", "Monthly report"],
  },
  {
    name: "Growth",
    price: "Custom",
    popular: true,
    features: ["20 social media posts", "8 reels", "Meta ads setup", "Content strategy", "Monthly analytics"],
  },
  {
    name: "Premium",
    price: "Custom",
    features: ["Full branding", "Website development", "Social media management", "Meta ads", "Creative strategy"],
  },
];

function Packages() {
  return (
    <section id="packages" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">PACKAGES</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black">Choose Your Growth Plan</h2>
          <p className="mt-5 text-white/55 max-w-2xl mx-auto text-lg">
            Flexible packages for startups, personal brands, and growing businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-[2rem] border p-8 backdrop-blur-xl transition hover:-translate-y-2 ${
                pkg.popular
                  ? "border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_50px_rgba(103,232,249,0.18)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {pkg.popular && (
                <span className="absolute top-6 right-6 px-4 py-1 rounded-full bg-cyan-300 text-black text-sm font-bold">
                  Popular
                </span>
              )}

              <h3 className="text-3xl font-black">{pkg.name}</h3>
              <p className="mt-3 text-white/50">Best for {pkg.name.toLowerCase()} level brands</p>

              <div className="mt-8">
                <span className="text-5xl font-black text-cyan-300">{pkg.price}</span>
                <p className="mt-2 text-white/45">Based on project requirements</p>
              </div>

              <div className="mt-8 space-y-4">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-white/70">
                    <span className="w-6 h-6 rounded-full bg-cyan-300/15 flex items-center justify-center">
                      <Check size={15} className="text-cyan-300" />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="mt-10 w-full py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Packages;