import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layouts/AdminLayout";
import { Eye, Trash2, MessageCircle, UserPlus } from "lucide-react";

function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchInquiries = async () => {
    try {
      const response = await api.get("/inquiries");
      setInquiries(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load inquiries");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const response = await api.delete(`/inquiries/${id}`);

      if (response.data.success) {
        alert("Inquiry deleted successfully");
        fetchInquiries();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete inquiry");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await api.put(`/inquiries/${id}/status`, { status });

      if (response.data.success) {
        fetchInquiries();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const handleConvert = async (id) => {
    if (!window.confirm("Convert this inquiry into a customer?")) return;

    try {
      const response = await api.post(`/inquiries/${id}/convert`);

      if (response.data.success) {
        alert("Inquiry converted to customer successfully");
        fetchInquiries();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to convert inquiry");
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.name?.toLowerCase().includes(search) ||
      item.phone?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.service?.toLowerCase().includes(search) ||
      item.message?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inquiry..."
            className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Replied">Replied</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {filteredInquiries.length === 0 ? (
          <p className="text-white/50">No inquiries found.</p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            {filteredInquiries.map((item) => (
              <div
                key={item._id}
                className="rounded-3xl border border-white/10 bg-black/30 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">{item.name}</h3>
                    <p className="text-white/45 mt-1">{item.email}</p>
                    <p className="text-white/45">{item.phone}</p>
                  </div>

                  <select
                    value={item.status || "New"}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                    className="px-3 py-2 rounded-full bg-black/60 text-cyan-300 border border-cyan-300/20 text-sm outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Replied">Replied</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="mt-5">
                  <p className="text-cyan-300 font-semibold">{item.service}</p>
                  <p className="mt-3 text-white/60 leading-7">
                    {item.message}
                  </p>
                </div>

                <p className="mt-5 text-white/35 text-sm">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "-"}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    onClick={() => handleConvert(item._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300"
                  >
                    <UserPlus size={16} />
                    Convert
                  </button>

                  <a
                    href={`https://wa.me/${item.phone?.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-green-300"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-red-300"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Inquiries;