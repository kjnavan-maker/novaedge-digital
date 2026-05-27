import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Globe } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Inquiry Submitted Successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="relative z-10 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cyan-300 tracking-[0.35em] text-sm font-semibold">
              CONTACT
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
              Let’s Build Your Digital Brand.
            </h2>

            <p className="mt-6 text-white/55 text-lg leading-8">
              Tell us about your business and the service you need. We’ll help
              you create a premium online presence.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4 text-white/70">
                <Mail className="text-cyan-300" />
                hello@novaedgedigital.com
              </div>

              <div className="flex items-center gap-4 text-white/70">
                <Globe className="text-cyan-300" />
                @novaedgedigital
              </div>

              <div className="flex items-center gap-4 text-white/70">
                <MapPin className="text-cyan-300" />
                Sri Lanka
              </div>

              <div className="flex items-center gap-4 text-white/70">
                <Phone className="text-cyan-300" />
                WhatsApp Available
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 space-y-5"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone / WhatsApp Number"
              required
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            >
              <option value="">Select Service</option>
              <option value="Brand Identity Design">Brand Identity Design</option>
              <option value="Social Media Management">Social Media Management</option>
              <option value="Meta Ads Campaigns">Meta Ads Campaigns</option>
              <option value="Website Development">Website Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Reels Editing">Reels Editing</option>
            </select>

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project"
              required
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
            >
              Submit Inquiry
            </button>

            <a
              href="https://wa.me/94764304068"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full border border-white/15 bg-white/5 hover:border-cyan-300/50 transition text-center block"
            >
              WhatsApp Us
            </a>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;