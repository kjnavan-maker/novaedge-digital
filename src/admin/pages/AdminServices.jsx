import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layouts/AdminLayout";
import { Pencil, Trash2, Plus } from "lucide-react";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const initialForm = {
    title: "",
    description: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialForm);

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

  const openAddForm = () => {
    setEditingService(null);
    setFormData(initialForm);
    setShowForm(true);
  };

  const openEditForm = (service) => {
    setEditingService(service);

    setFormData({
      title: service.title || "",
      description: service.description || "",
      status: service.status || "Active",
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = editingService
        ? await api.put(
            `/services/${editingService._id}`,
            formData
          )
        : await api.post("/services", formData);

      if (response.data.success) {
        alert(
          editingService
            ? "Service updated successfully"
            : "Service added successfully"
        );

        setShowForm(false);
        setEditingService(null);
        setFormData(initialForm);

        fetchServices();
      }
    } catch (error) {
      console.error(error);

      alert(
        editingService
          ? "Failed to update service"
          : "Failed to add service"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black">
            Services
          </h1>

          <p className="mt-2 text-white/50">
            Manage NovaEdge Digital services.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <div className="overflow-x-auto">
          {services.length === 0 ? (
            <p className="text-white/50">
              No services found.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="py-4 px-4">Title</th>
                  <th className="py-4 px-4">
                    Description
                  </th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className="border-b border-white/5"
                  >
                    <td className="py-4 px-4 font-semibold">
                      {service.title}
                    </td>

                    <td className="py-4 px-4 text-white/60">
                      {service.description}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          service.status === "Active"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            openEditForm(service)
                          }
                          className="text-blue-300 hover:text-blue-200"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(service._id)
                          }
                          className="text-red-300 hover:text-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#080808] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black">
                {editingService
                  ? "Edit Service"
                  : "Add Service"}
              </h2>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                  setFormData(initialForm);
                }}
                className="text-white/50 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
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
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
              >
                {editingService
                  ? "Update Service"
                  : "Save Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminServices;