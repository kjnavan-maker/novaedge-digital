import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layouts/AdminLayout";
import {
  Users,
  MessageSquare,
  Briefcase,
  CheckCircle,
  Layers,
  Image,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  const fetchData = async () => {
    try {
      const [inquiriesRes, customersRes, servicesRes, portfolioRes] =
        await Promise.all([
          api.get("/inquiries"),
          api.get("/customers"),
          api.get("/services"),
          api.get("/portfolio"),
        ]);

      setInquiries(inquiriesRes.data.data || []);
      setCustomers(customersRes.data.data || []);
      setServices(servicesRes.data.data || []);
      setPortfolio(portfolioRes.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const newInquiries = inquiries.filter(
    (item) => (item.status || "New") === "New"
  ).length;

  const converted = inquiries.filter(
    (item) => item.status === "Converted"
  ).length;

  const closed = inquiries.filter((item) => item.status === "Closed").length;

  const conversionRate =
    inquiries.length > 0 ? ((converted / inquiries.length) * 100).toFixed(1) : 0;

  const stats = [
    { title: "Total Customers", value: customers.length, icon: Users },
    { title: "New Inquiries", value: newInquiries, icon: MessageSquare },
    { title: "Converted Leads", value: converted, icon: Briefcase },
    { title: "Closed Inquiries", value: closed, icon: CheckCircle },
    { title: "Total Services", value: services.length, icon: Layers },
    { title: "Portfolio Projects", value: portfolio.length, icon: Image },
  ];

  const monthlyData = [
    { month: "Jan", inquiries: 0, customers: 0 },
    { month: "Feb", inquiries: 0, customers: 0 },
    { month: "Mar", inquiries: 0, customers: 0 },
    { month: "Apr", inquiries: 0, customers: 0 },
    { month: "May", inquiries: inquiries.length, customers: customers.length },
    { month: "Jun", inquiries: 0, customers: 0 },
  ];

  const statusData = [
    { name: "New", value: newInquiries },
    { name: "Converted", value: converted },
    { name: "Closed", value: closed },
  ];

  const COLORS = ["#67e8f9", "#22c55e", "#f97316"];

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-black">Dashboard</h1>
        <p className="mt-2 text-white/50">
          Overview of NovaEdge Digital business activities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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

      <div className="grid xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2 rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <h2 className="text-2xl font-bold mb-2">Business Growth</h2>
          <p className="text-white/45 mb-6">
            Monthly inquiries and customer growth overview.
          </p>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    background: "#0b0b0b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="inquiries"
                  stroke="#67e8f9"
                  fill="#67e8f933"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="customers"
                  stroke="#22c55e"
                  fill="#22c55e33"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <h2 className="text-2xl font-bold mb-2">Lead Status</h2>
          <p className="text-white/45 mb-6">
            Current inquiry status breakdown.
          </p>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0b0b0b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 p-4">
            <p className="text-white/50">Conversion Rate</p>
            <p className="text-3xl font-black text-cyan-300">
              {conversionRate}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6 mt-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <h2 className="text-2xl font-bold mb-5">Recent Inquiries</h2>

          {inquiries.length === 0 ? (
            <p className="text-white/50">No recent inquiries.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-white/10 pb-4"
                >
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

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <h2 className="text-2xl font-bold mb-5">Recent Customers</h2>

          {customers.length === 0 ? (
            <p className="text-white/50">No recent customers.</p>
          ) : (
            <div className="space-y-4">
              {customers.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-white/10 pb-4"
                >
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-white/45">{item.service}</p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 text-sm w-fit">
                    {item.status || "New"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;