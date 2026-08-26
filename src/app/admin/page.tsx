import StaffDashboard from "@/components/StaffDashboard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 md:px-8 relative">
      
      {/* Back to Form Entrance (Fixed) */}
      <div className="fixed top-4 right-4 z-50 hidden sm:block">
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-white text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors px-4 py-2 rounded-full text-sm font-semibold shadow-md border border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5 duration-200"
        >
          <ArrowLeft size={16} />
          Back to Patient Form
        </Link>
      </div>

      <StaffDashboard />
    </main>
  );
}
