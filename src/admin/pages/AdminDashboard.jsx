import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layouts/AdminLayout";
import { Users, MessageSquare, Briefcase, CheckCircle } from "lucide-react";

function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    try {
      const inquiriesRes = await api.get("/inquiries");
      const customersRes = await api.get("/customers");

      setInquiries(inquiriesRes.data.data);
      setCustomers(customersRes.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const newInquiries = inquiries.filter((item) => item.status === "New").length;
  const converted = inquiries.filter((item) => item.status === "Converted").length;
  const closed = inquiries.filter((item) => item.status === "Closed").length;

  const stats = [
    { title: "Total Customers", value: customers.length, icon: Users },
    { title: "New Inquiries", value: newInquiries, icon: MessageSquare },
    { title: "Converted Leads", value: converted, icon: Briefcase },
    { title: "Closed Inquiries", value: closed, icon: CheckCircle },
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
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center mb-6">
                <Icon className="text-cyan-300" size={24} />
              </div>
              <h3 className="text-white/50">{item.title}</h3>
              <p className="mt-2 text-4xl font-black text-cyan-300">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <h2 className="text-2xl font-bold mb-5">Recent Inquiries</h2>

        {inquiries.length === 0 ? (
          <p className="text-white/50">No recent inquiries.</p>
        ) : (
          <div className="space-y-4">
            {inquiries.slice(0, 5).map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-white/45">{item.service}</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-cyan-300/10 text-cyan-300 border border-cyan-300/20 text-sm w-fit">
                  {item.status || "New"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;