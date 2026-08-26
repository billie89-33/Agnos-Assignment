import StaffDashboard from "@/components/StaffDashboard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 md:px-8">
      <StaffDashboard />
      
      <div className="max-w-6xl mx-auto mt-8 flex justify-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-full text-sm font-medium border border-slate-200 shadow-sm hover:border-indigo-200"
        >
          <ArrowLeft size={16} />
          Back to Patient Form
        </Link>
      </div>
    </main>
  );
}
