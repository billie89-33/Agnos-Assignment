import PatientForm from "@/components/PatientForm";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4 relative">
      
      {/* Admin Entrance (Fixed to top right so it's always visible) */}
      <div className="fixed top-4 right-4 z-50">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
        >
          <ShieldCheck size={16} />
          Go to Staff Portal
        </Link>
      </div>

      <PatientForm />
    </main>
  );
}
