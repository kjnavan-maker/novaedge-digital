import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layouts/AdminLayout";
import { Trash2, Plus } from "lucide-react";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Active",
  });

  const fetchServices = async () => {
    try {
      const response = await api.get("/services");

      setServices(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
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
      const response = await api.post("/services", formData);

      if (response.data.success) {
        alert("Service added successfully");

        setFormData({
          title: "",
          description: "",
          status: "Active",
        });

        setShowForm(false);

        fetchServices();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add service");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/services/${id}`);

      if (response.data.success) {
        alert("Service deleted successfully");

        fetchServices();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete service");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-black">Services</h1>

          <p className="mt-2 text-white/50">
            Manage NovaEdge Digital services.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {services.length === 0 ? (
          <p className="text-white/50">No services found.</p>
        ) : (
          services.map((service) => (
            <div
              key={service._id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h2 className="text-2xl font-bold">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-white/60 leading-7">
                    {service.description}
                  </p>

                  <span className="inline-block mt-5 px-3 py-1 rounded-full bg-cyan-300/10 text-cyan-300 border border-cyan-300/20 text-sm">
                    {service.status}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(service._id)}
                  className="text-red-300 hover:text-red-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#080808] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black">
                Add Service
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-white/50 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Service Title"
                required
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Service Description"
                required
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white resize-none"
              ></textarea>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
              >
                Save Service
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminServices;