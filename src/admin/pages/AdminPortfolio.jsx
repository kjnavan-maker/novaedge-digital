import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layouts/AdminLayout";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

function AdminPortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  const initialForm = {
    title: "",
    category: "",
    description: "",
    image: "",
    projectUrl: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchPortfolios = async () => {
    try {
      const response = await api.get("/portfolio");
      setPortfolios(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load portfolio");
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const uploadData = new FormData();
  uploadData.append("image", file);

  try {
    const response = await api.post("/upload/image", uploadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      setFormData({
        ...formData,
        image: response.data.imageUrl,
      });

      alert("Image uploaded successfully");
    }
  } catch (error) {
    console.error(error);
    alert("Image upload failed");
  }
};

  const openAddForm = () => {
    setEditingPortfolio(null);
    setFormData(initialForm);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditingPortfolio(item);
    setFormData({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      image: item.image || "",
      projectUrl: item.projectUrl || "",
      status: item.status || "Active",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = editingPortfolio
        ? await api.put(`/portfolio/${editingPortfolio._id}`, formData)
        : await api.post("/portfolio", formData);

      if (response.data.success) {
        alert(
          editingPortfolio
            ? "Portfolio updated successfully"
            : "Portfolio added successfully"
        );

        setShowForm(false);
        setEditingPortfolio(null);
        setFormData(initialForm);
        fetchPortfolios();
      }
    } catch (error) {
      console.error(error);
      alert(
        editingPortfolio
          ? "Failed to update portfolio"
          : "Failed to add portfolio"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio item?")) return;

    try {
      const response = await api.delete(`/portfolio/${id}`);

      if (response.data.success) {
        alert("Portfolio deleted successfully");
        fetchPortfolios();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete portfolio");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-black">Portfolio</h1>
          <p className="mt-2 text-white/50">
            Manage NovaEdge Digital project portfolio.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
        >
          <Plus size={18} />
          Add Portfolio
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {portfolios.length === 0 ? (
          <p className="text-white/50">No portfolio items found.</p>
        ) : (
          portfolios.map((item) => (
            <div
              key={item._id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="h-56 bg-cyan-300/10 flex items-center justify-center text-cyan-300">
                  No Image
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="text-cyan-300 text-sm">
                      {item.category}
                    </span>
                    <h2 className="mt-2 text-2xl font-bold">{item.title}</h2>
                    <p className="mt-3 text-white/60 leading-7">
                      {item.description}
                    </p>

                    <span className="inline-block mt-5 px-3 py-1 rounded-full bg-cyan-300/10 text-cyan-300 border border-cyan-300/20 text-sm">
                      {item.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {item.projectUrl && (
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:text-cyan-200"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}

                    <button
                      onClick={() => openEditForm(item)}
                      className="text-blue-300 hover:text-blue-200"
                    >
                      <Pencil size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-300 hover:text-red-200"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 bg-[#080808] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black">
                {editingPortfolio ? "Edit Portfolio" : "Add Portfolio"}
              </h2>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPortfolio(null);
                  setFormData(initialForm);
                }}
                className="text-white/50 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title"
                required
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <div className="md:col-span-2">
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
  />

  {formData.image && (
    <img
      src={formData.image}
      alt="Preview"
      className="mt-4 w-full h-56 object-cover rounded-2xl border border-white/10"
    />
  )}
</div>

              <input
                type="text"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleChange}
                placeholder="Project URL"
                className="md:col-span-2 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="md:col-span-2 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
                rows="5"
                required
                className="md:col-span-2 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white resize-none"
              ></textarea>

              <button
                type="submit"
                className="md:col-span-2 py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
              >
                {editingPortfolio ? "Update Portfolio" : "Save Portfolio"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminPortfolio;