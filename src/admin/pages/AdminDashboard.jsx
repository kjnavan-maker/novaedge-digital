import AdminLayout from "../layouts/AdminLayout";
import { Users, MessageSquare, Briefcase, CheckCircle } from "lucide-react";

function AdminDashboard() {
  const stats = [
    { title: "Total Customers", value: "0", icon: Users },
    { title: "New Inquiries", value: "0", icon: MessageSquare },
    { title: "Active Projects", value: "0", icon: Briefcase },
    { title: "Completed", value: "0", icon: CheckCircle },
  ];

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-black">Dashboard</h1>
        <p className="mt-2 text-white/50">
          Manage NovaEdge Digital customers and inquiries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center mb-6">
                <Icon className="text-cyan-300" size={24} />
              </div>

              <h3 className="text-white/50">{item.title}</h3>

              <p className="mt-2 text-4xl font-black text-cyan-300">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;