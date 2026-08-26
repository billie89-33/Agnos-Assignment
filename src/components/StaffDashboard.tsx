"use client";

import { useEffect, useState } from "react";
import { Activity, User, Phone, MapPin, Globe, HeartPulse, UserCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function StaffDashboard() {
  const [patientData, setPatientData] = useState<any>({});
  const [status, setStatus] = useState<"inactive" | "actively_filling" | "submitted">("inactive");

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const channel = supabase.channel('patient-room', {
      config: {
        broadcast: { ack: false },
        presence: { key: 'admin' },
      },
    });

    channel
      .on('broadcast', { event: 'form-update' }, (payload) => {
        // Update the admin view with real-time data from the patient form
        setPatientData(payload.payload);
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        // Check if there is a patient in the room and what their status is
        if (state.patient && state.patient.length > 0) {
          const patientStatus = (state.patient[0] as any).status;
          setStatus(patientStatus);
        } else {
          // If no patient is connected, set status back to inactive
          setStatus("inactive");
          setPatientData({}); // Optionally clear data when patient leaves
        }
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
              <p className={`font-semibold text-lg ${patientData.firstName ? "text-slate-800" : "text-slate-300"}`}>{patientData.firstName || "Waiting..."}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Middle Name</p>
              <p className={`font-semibold text-lg ${patientData.middleName ? "text-slate-800" : "text-slate-300"}`}>{patientData.middleName || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Last Name</p>
              <p className={`font-semibold text-lg ${patientData.lastName ? "text-slate-800" : "text-slate-300"}`}>{patientData.lastName || "Waiting..."}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Date of Birth</p>
              <p className={`font-semibold text-lg ${patientData.dob ? "text-slate-800" : "text-slate-300"}`}>{patientData.dob || "Waiting..."}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Gender</p>
              <p className={`font-semibold text-lg ${patientData.gender ? "text-slate-800" : "text-slate-300"}`}>{patientData.gender || "Waiting..."}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Nationality</p>
              <div className="flex items-center gap-2">
                <Globe size={16} className={patientData.nationality ? "text-slate-400" : "text-slate-200"} />
                <p className={`font-semibold text-lg ${patientData.nationality ? "text-slate-800" : "text-slate-300"}`}>{patientData.nationality || "Waiting..."}</p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-medium text-slate-400 mb-1">Religion</p>
              <p className={`font-semibold text-lg ${patientData.religion ? "text-slate-800" : "text-slate-300"}`}>{patientData.religion || "-"}</p>
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
                <p className={`font-semibold ${patientData.phone ? "text-slate-800" : "text-slate-300"}`}>{patientData.phone || "Waiting..."}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Email</p>
                <p className={`font-semibold break-all ${patientData.email ? "text-slate-800" : "text-slate-300"}`}>{patientData.email || "Waiting..."}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Address</p>
                <div className="flex items-start gap-2">
                  <MapPin size={18} className={`mt-0.5 shrink-0 ${patientData.address ? "text-slate-400" : "text-slate-200"}`} />
                  <p className={`font-semibold ${patientData.address ? "text-slate-800" : "text-slate-300"}`}>{patientData.address || "Waiting..."}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Language</p>
                <p className={`font-semibold ${patientData.language ? "text-slate-800" : "text-slate-300"}`}>{patientData.language || "Waiting..."}</p>
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
                <p className={`font-semibold ${patientData.emergencyName ? "text-slate-800" : "text-slate-300"}`}>{patientData.emergencyName || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Relationship</p>
                <p className={`font-semibold ${patientData.emergencyRelation ? "text-slate-800" : "text-slate-300"}`}>{patientData.emergencyRelation || "-"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
