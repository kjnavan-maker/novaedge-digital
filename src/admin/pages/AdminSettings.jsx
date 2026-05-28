import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layouts/AdminLayout";

function AdminSettings() {
  const [formData, setFormData] = useState({
    agencyName: "",
    adminEmail: "",
    whatsappNumber: "",
    instagramLink: "",
    location: "",
    agencyBio: "",
  });

  const fetchSettings = async () => {
    try {
      const response = await api.get("/settings");

      setFormData(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load settings");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/settings", formData);

      if (response.data.success) {
        alert("Settings updated successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update settings");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-black">Settings</h1>

        <p className="mt-2 text-white/50">
          Manage NovaEdge Digital system settings.
        </p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8">
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="agencyName"
            value={formData.agencyName}
            onChange={handleChange}
            placeholder="Agency Name"
            className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <input
            type="email"
            name="adminEmail"
            value={formData.adminEmail}
            onChange={handleChange}
            placeholder="Admin Email"
            className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <input
            type="text"
            name="instagramLink"
            value={formData.instagramLink}
            onChange={handleChange}
            placeholder="Instagram Username"
            className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <textarea
            rows="6"
            name="agencyBio"
            value={formData.agencyBio}
            onChange={handleChange}
            placeholder="Agency Bio"
            className="md:col-span-2 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white resize-none"
          ></textarea>

          <button
            type="submit"
            className="md:col-span-2 py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
          >
            Save Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminSettings;