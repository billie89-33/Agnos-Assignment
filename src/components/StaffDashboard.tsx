"use client";

import { Activity, User, Phone, MapPin, Globe, HeartPulse, UserCircle } from "lucide-react";

export default function StaffDashboard() {
  // Mock data for UI development phase
  const patientData = {
    firstName: "Somchai",
    middleName: "-",
    lastName: "Jaidee",
    dob: "1990-05-12",
    gender: "Male",
    nationality: "Thai",
    religion: "Buddhism",
    phone: "0812345678",
    email: "somchai@email.com",
    address: "123 Sukhumvit Rd, Bangkok, 10110",
    language: "Thai",
    emergencyName: "Somsri Jaidee",
    emergencyRelation: "Mother",
  };

  const status: "inactive" | "actively_filling" | "submitted" = "actively_filling"; // Mock status

  const getStatusBadge = () => {
    switch (status) {
      case "submitted":
        return <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold text-sm shadow-sm border border-emerald-200"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> 🟢 Submitted</div>;
      case "actively_filling":
        return <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold text-sm shadow-sm border border-amber-200"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span> 🟡 Actively filling...</div>;
      default:
        return <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full font-semibold text-sm shadow-sm border border-slate-200"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> ⚪ Inactive</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Navbar / Header */}
      <header className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-xl">
            <Activity size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Staff Monitor</h1>
            <p className="text-sm text-slate-500 font-medium">Real-time Patient Data Sync</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {getStatusBadge()}
          <div className="hidden sm:flex items-center gap-2 border-l pl-6 border-slate-200">
            <UserCircle size={28} className="text-slate-400" />
            <div className="text-sm">
              <p className="font-bold text-slate-700">Admin Profile</p>
              <p className="text-xs text-slate-500">Front Desk</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Personal Details Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/80 border-b border-slate-100 p-4 flex items-center gap-2">
            <User size={18} className="text-indigo-600" />
            <h2 className="font-bold text-slate-800">Personal Details</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">First Name</p>
              <p className="font-semibold text-slate-800 text-lg">{patientData.firstName || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Middle Name</p>
              <p className="font-semibold text-slate-800 text-lg">{patientData.middleName || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Last Name</p>
              <p className="font-semibold text-slate-800 text-lg">{patientData.lastName || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Date of Birth</p>
              <p className="font-semibold text-slate-800 text-lg">{patientData.dob || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Gender</p>
              <p className="font-semibold text-slate-800 text-lg">{patientData.gender || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Nationality</p>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-slate-400" />
                <p className="font-semibold text-slate-800 text-lg">{patientData.nationality || "-"}</p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-medium text-slate-400 mb-1">Religion</p>
              <p className="font-semibold text-slate-800 text-lg">{patientData.religion || "-"}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          {/* Contact Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50/80 border-b border-slate-100 p-4 flex items-center gap-2">
              <Phone size={18} className="text-sky-600" />
              <h2 className="font-bold text-slate-800">Contact Info</h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Phone Number</p>
                <p className="font-semibold text-slate-800">{patientData.phone || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Email</p>
                <p className="font-semibold text-slate-800 break-all">{patientData.email || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Address</p>
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-slate-400 mt-0.5 shrink-0" />
                  <p className="font-semibold text-slate-800">{patientData.address || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Language</p>
                <p className="font-semibold text-slate-800">{patientData.language || "-"}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50/80 border-b border-slate-100 p-4 flex items-center gap-2">
              <HeartPulse size={18} className="text-rose-500" />
              <h2 className="font-bold text-slate-800">Emergency Contact</h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Contact Name</p>
                <p className="font-semibold text-slate-800">{patientData.emergencyName || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Relationship</p>
                <p className="font-semibold text-slate-800">{patientData.emergencyRelation || "-"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
