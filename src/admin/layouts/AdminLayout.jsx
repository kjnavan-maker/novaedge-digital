import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";

function AdminLayout({ children }) {
    const navigate = useNavigate();

const handleLogout = () => {
  alert("Logged out successfully");
  navigate("/admin");
};

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
    { name: "Services", path: "/admin/services", icon: Briefcase },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <aside className="hidden md:block w-72 border-r border-white/10 bg-black/40 p-6">
        <h1 className="text-2xl font-black mb-10">
          <span className="text-cyan-300">NovaEdge</span> Admin
        </h1>

        <nav className="space-y-3">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/65 hover:text-cyan-300 hover:bg-white/5 transition"
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
  onClick={handleLogout}
  className="mt-10 flex items-center gap-3 px-4 py-3 rounded-2xl text-red-300 hover:bg-red-500/10 transition"
>
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}

export default AdminLayout;