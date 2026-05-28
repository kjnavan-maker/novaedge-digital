import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, MapPin, Globe, Phone } from "lucide-react";

function Contact() {
  const [settings, setSettings] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        "https://novaedge-digital.onrender.com/api/settings"
      );

      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://novaedge-digital.onrender.com/api/inquiries",
        formData
      );

      if (response.data.success) {
        alert("Inquiry Submitted Successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit inquiry");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-5xl font-black mb-6">
            Let’s Build Something Amazing
          </h2>

          <p className="text-white/60 mb-10">
            Contact NovaEdge Digital for premium branding, web development, and
            digital marketing solutions.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-cyan-300" />
              <span>{settings.adminEmail || "hello@novaedgedigital.com"}</span>
            </div>

            <div className="flex items-center gap-4">
              <Globe className="text-cyan-300" />
              <span>{settings.instagramLink || "@novaedgedigital"}</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-cyan-300" />
              <span>{settings.location || "Sri Lanka"}</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-cyan-300" />
              <span>{settings.whatsappNumber || "+94 76 430 4068"}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone / WhatsApp Number"
              required
              className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300"
            />

            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Required Service"
              required
              className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300"
            />

            <textarea
              rows="6"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 resize-none"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;