import AdminLayout from "../layouts/AdminLayout";
import { Eye, Trash2, MessageCircle, UserPlus } from "lucide-react";

function Inquiries() {
  const inquiries = [
    {
      name: "Sample Inquiry",
      phone: "+94 76 430 4068",
      email: "sample@email.com",
      service: "Social Media Management",
      message: "I need help to promote my business online.",
      status: "New",
      date: "2026-05-27",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-black">Inquiries</h1>
          <p className="mt-2 text-white/50">
            Manage website contact form submissions.
          </p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search inquiry..."
            className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <select className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white">
            <option>All Status</option>
            <option>New</option>
            <option>Replied</option>
            <option>Converted</option>
            <option>Closed</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {inquiries.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-black/30 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <p className="text-white/45 mt-1">{item.email}</p>
                  <p className="text-white/45">{item.phone}</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-cyan-300/10 text-cyan-300 border border-cyan-300/20 text-sm">
                  {item.status}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-cyan-300 font-semibold">{item.service}</p>
                <p className="mt-3 text-white/60 leading-7">{item.message}</p>
              </div>

              <p className="mt-5 text-white/35 text-sm">{item.date}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 hover:border-cyan-300/40 transition">
                  <Eye size={16} />
                  View
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 hover:border-blue-300/40 transition">
                  <UserPlus size={16} />
                  Convert
                </button>

                <a
                  href="https://wa.me/94764304068"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-green-300 hover:border-green-300/40 transition"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-red-300 hover:border-red-300/40 transition">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Inquiries;