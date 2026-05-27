import AdminLayout from "../layouts/AdminLayout";
import { Save } from "lucide-react";

function AdminSettings() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-black">Settings</h1>
        <p className="mt-2 text-white/50">
          Update NovaEdge Digital contact and brand details.
        </p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-white/60">Agency Name</label>
            <input
              type="text"
              defaultValue="NovaEdge Digital"
              className="mt-2 w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />
          </div>

          <div>
            <label className="text-white/60">Admin Email</label>
            <input
              type="email"
              defaultValue="hello@novaedgedigital.com"
              className="mt-2 w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />
          </div>

          <div>
            <label className="text-white/60">WhatsApp Number</label>
            <input
              type="text"
              defaultValue="+94 76 430 4068"
              className="mt-2 w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />
          </div>

          <div>
            <label className="text-white/60">Instagram Link</label>
            <input
              type="text"
              defaultValue="@novaedgedigital"
              className="mt-2 w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />
          </div>

          <div>
            <label className="text-white/60">Location</label>
            <input
              type="text"
              defaultValue="Sri Lanka"
              className="mt-2 w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />
          </div>

          <div>
            <label className="text-white/60">Logo Upload</label>
            <input
              type="file"
              className="mt-2 w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-white/60">Agency Short Bio</label>
          <textarea
            rows="5"
            defaultValue="Premium digital marketing, branding, websites, and creative technology solutions for modern businesses."
            className="mt-2 w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-cyan-300 text-white resize-none"
          ></textarea>
        </div>

        <button className="mt-8 flex items-center gap-2 px-6 py-4 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition">
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
}

export default AdminSettings;