import AdminLayout from "../layouts/AdminLayout";
import { Eye, Pencil, Trash2, MessageCircle, Plus } from "lucide-react";

function Customers() {
  const customers = [
    {
      name: "Sample Customer",
      phone: "+94 76 430 4068",
      email: "customer@email.com",
      business: "Demo Business",
      service: "Website Development",
      status: "New",
      date: "2026-05-27",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-black">Customers</h1>
          <p className="mt-2 text-white/50">
            Manage NovaEdge Digital customers.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition">
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search customer..."
            className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
          />

          <select className="px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white">
            <option>All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
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
              {customers.map((customer, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-4 px-4 font-semibold">{customer.name}</td>
                  <td className="py-4 px-4 text-white/60">{customer.phone}</td>
                  <td className="py-4 px-4 text-white/60">{customer.business}</td>
                  <td className="py-4 px-4 text-white/60">{customer.service}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-300/10 text-cyan-300 border border-cyan-300/20 text-sm">
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/60">{customer.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button className="text-cyan-300 hover:text-cyan-200">
                        <Eye size={18} />
                      </button>
                      <button className="text-blue-300 hover:text-blue-200">
                        <Pencil size={18} />
                      </button>
                      <a
                        href="https://wa.me/94764304068"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 hover:text-green-200"
                      >
                        <MessageCircle size={18} />
                      </a>
                      <button className="text-red-300 hover:text-red-200">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Customers;