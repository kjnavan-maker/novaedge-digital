import AdminLayout from "../layouts/AdminLayout";
import { Plus, Pencil, Trash2 } from "lucide-react";

function AdminServices() {
  const services = [
    {
      title: "Brand Identity Design",
      description: "Premium logo systems, colors, typography and visual identity.",
      status: "Active",
    },
    {
      title: "Social Media Management",
      description: "Content planning, page management and creative direction.",
      status: "Active",
    },
    {
      title: "Website Development",
      description: "Fast, responsive and premium websites for modern businesses.",
      status: "Active",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-black">Services</h1>
          <p className="mt-2 text-white/50">
            Manage NovaEdge Digital service list.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-cyan-300/10 text-cyan-300 border border-cyan-300/20 text-sm">
                  {service.status}
                </span>
              </div>
            </div>

            <p className="mt-5 text-white/55 leading-7">
              {service.description}
            </p>

            <div className="mt-6 flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 hover:border-blue-300/40 transition">
                <Pencil size={16} />
                Edit
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-red-300 hover:border-red-300/40 transition">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminServices;