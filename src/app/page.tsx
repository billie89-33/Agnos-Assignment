import PatientForm from "@/components/PatientForm";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4 relative">
      <PatientForm />
      
      {/* Admin Entrance for easy navigation during assignment evaluation */}
      <div className="max-w-4xl mx-auto mt-8 flex justify-center">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors bg-white/50 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 hover:border-indigo-200"
        >
          <ShieldCheck size={16} />
          Go to Staff Portal
        </Link>
      </div>
    </main>
  );
}
