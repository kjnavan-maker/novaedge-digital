import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const API_URL =
    "https://novaedge-digital.onrender.com/api/auth/login";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, formData);

      if (response.data.success) {
        localStorage.setItem("novaedgeToken", response.data.token);

        alert("Login Successful");

        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-400/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black">
            <span className="text-cyan-300">NovaEdge</span> Digital
          </h1>

          <p className="mt-2 text-white/50">
            Secure Admin Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail
              className="absolute left-4 top-4 text-cyan-300"
              size={20}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Admin Email"
              required
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-4 top-4 text-cyan-300"
              size={20}
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;