import { motion } from "framer-motion";

function About() {
  return (
    <section
      id="about"
      className="relative z-10 px-6 py-24"
    >
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">
              ABOUT US
            </p>

            <h2 className="mt-5 text-4xl md:text-6xl font-black leading-tight">
              Building Modern Brands With Creative Technology.
            </h2>

            <p className="mt-8 text-white/60 text-lg leading-8">
              NovaEdge Digital is a premium digital marketing and
              creative technology agency focused on branding,
              websites, social media marketing, UI/UX design,
              and modern digital experiences.
            </p>

            <p className="mt-5 text-white/50 leading-8">
              We combine creativity, strategy, design, and
              technology to help businesses grow with strong
              premium branding and high-quality digital presence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <span className="px-5 py-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                Branding
              </span>

              <span className="px-5 py-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                Marketing
              </span>

              <span className="px-5 py-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                Websites
              </span>

              <span className="px-5 py-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                Creative Tech
              </span>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-cyan-400/10 blur-[100px] rounded-full" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10">

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                  <h3 className="text-4xl font-black text-cyan-300">
                    50+
                  </h3>

                  <p className="mt-3 text-white/55">
                    Creative Projects
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                  <h3 className="text-4xl font-black text-cyan-300">
                    100%
                  </h3>

                  <p className="mt-3 text-white/55">
                    Premium Focus
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                  <h3 className="text-4xl font-black text-cyan-300">
                    Modern
                  </h3>

                  <p className="mt-3 text-white/55">
                    UI/UX Systems
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                  <h3 className="text-4xl font-black text-cyan-300">
                    Creative
                  </h3>

                  <p className="mt-3 text-white/55">
                    Strategy & Design
                  </p>
                </div>

              </div>

              <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6">
                <p className="text-cyan-200 text-lg leading-8">
                  Founded by KJ Navaneethan & P.S. Nirogi
                </p>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;