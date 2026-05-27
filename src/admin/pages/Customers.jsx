import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import { Eye, Pencil, Trash2, MessageCircle, Plus } from "lucide-react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    service: "",
    budget: "",
    status: "New",
    notes: "",
  });

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");

      if (response.data.success) {
        setCustomers(response.data.data);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
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
      const response = await axios.post(
        "http://localhost:5000/api/customers",
        formData
      );

      if (response.data.success) {
        alert("Customer added successfully");

        setFormData({
          name: "",
          phone: "",
          email: "",
          business: "",
          service: "",
          budget: "",
          status: "New",
          notes: "",
        });

        setShowForm(false);
        fetchCustomers();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add customer");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/customers/${id}`
      );

      if (response.data.success) {
        alert("Customer deleted successfully");
        fetchCustomers();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete customer");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/customers/${id}/status`,
        { status }
      );

      if (response.data.success) {
        fetchCustomers();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update customer status");
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      customer.name?.toLowerCase().includes(search) ||
      customer.phone?.toLowerCase().includes(search) ||
      customer.email?.toLowerCase().includes(search) ||
      customer.business?.toLowerCase().includes(search) ||
      customer.service?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-black">Customers</h1>
          <p className="mt-2 text-white/50">
            Manage NovaEdge Digital customers.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer..."
            className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          {filteredCustomers.length === 0 ? (
            <p className="text-white/50">No customers found.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Phone</th>
                  <th className="py-4 px-4">Business</th>
                  <th className="py-4 px-4">Service</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="border-b border-white/5">
                    <td className="py-4 px-4 font-semibold">
                      {customer.name}
                    </td>

                    <td className="py-4 px-4 text-white/60">
                      {customer.phone}
                    </td>

                    <td className="py-4 px-4 text-white/60">
                      {customer.business}
                    </td>

                    <td className="py-4 px-4 text-white/60">
                      {customer.service}
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={customer.status || "New"}
                        onChange={(e) =>
                          handleStatusChange(customer._id, e.target.value)
                        }
                        className="px-3 py-2 rounded-full bg-black/60 text-cyan-300 border border-cyan-300/20 text-sm outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-white/60">
                      {customer.createdAt
                        ? new Date(customer.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex gap-3">
                        <button className="text-cyan-300 hover:text-cyan-200">
                          <Eye size={18} />
                        </button>

                        <button className="text-blue-300 hover:text-blue-200">
                          <Pencil size={18} />
                        </button>

                        <a
                          href={`https://wa.me/${customer.phone?.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-300 hover:text-green-200"
                        >
                          <MessageCircle size={18} />
                        </a>

                        <button
                          onClick={() => handleDelete(customer._id)}
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
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 bg-[#080808] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black">Add Customer</h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-white/50 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Customer Name"
                required
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <input
                type="text"
                name="business"
                value={formData.business}
                onChange={handleChange}
                placeholder="Business Name"
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              >
                <option value="">Select Service</option>
                <option value="Brand Identity Design">Brand Identity Design</option>
                <option value="Social Media Management">
                  Social Media Management
                </option>
                <option value="Meta Ads Campaigns">Meta Ads Campaigns</option>
                <option value="Website Development">Website Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Reels Editing">Reels Editing</option>
              </select>

              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Budget"
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes"
                rows="4"
                className="md:col-span-2 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white resize-none"
              ></textarea>

              <button
                type="submit"
                className="md:col-span-2 py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition"
              >
                Save Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Customers;