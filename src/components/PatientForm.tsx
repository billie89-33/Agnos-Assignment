"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Calendar, MapPin, Phone, Mail, Globe, HeartPulse, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Schema for form validation
const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  religion: z.string().optional(),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  language: z.string().min(1, "Preferred Language is required"),
  emergencyName: z.string().optional(),
  emergencyRelation: z.string().optional(),
});

export type PatientFormData = z.infer<typeof formSchema>;

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(formSchema),
  });

  const formValues = watch();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Initialize Supabase Channel
  useEffect(() => {
    // Only connect if we have a URL (prevents crashing if env is missing)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const channel = supabase.channel('patient-room', {
      config: {
        broadcast: { ack: false },
        presence: { key: 'patient' },
      },
    });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ status: 'inactive' });
      }
    });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Broadcast data whenever form changes
  useEffect(() => {
    if (channelRef.current && Object.values(formValues).some((v) => v !== undefined && v !== "")) {
      // Send form data via broadcast
      channelRef.current.send({
        type: 'broadcast',
        event: 'form-update',
        payload: formValues,
      });
      // Update presence to actively filling
      channelRef.current.track({ status: 'actively_filling' });
    }
  }, [formValues]);

  const onSubmit = (data: PatientFormData) => {
    console.log("Form Submitted:", data);
    alert("Information submitted successfully!");
    if (channelRef.current) {
      channelRef.current.track({ status: 'submitted' });
    }
  };

  // Helper for input styles
  const inputClass = "w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-700 shadow-sm";
  const labelClass = "text-sm font-semibold text-slate-700 mb-1.5 ml-1 block";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm">
              <HeartPulse size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Agnos Hospital</h1>
          </div>
          <p className="text-indigo-100 text-sm md:text-base font-medium opacity-90 pl-1">
            Patient Registration Form • Please provide your accurate information.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-10">
          
          {/* Personal Details */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <User size={18} className="text-indigo-600"/>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Personal Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className={labelClass}>First Name <span className="text-rose-500">*</span></label>
                <input {...register("firstName")} className={inputClass} placeholder="e.g. Somchai" />
                {errors.firstName && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.firstName.message}</span>}
              </div>

              <div>
                <label className={labelClass}>Middle Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input {...register("middleName")} className={inputClass} placeholder="-" />
              </div>

              <div>
                <label className={labelClass}>Last Name <span className="text-rose-500">*</span></label>
                <input {...register("lastName")} className={inputClass} placeholder="e.g. Jaidee" />
                {errors.lastName && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.lastName.message}</span>}
              </div>

              <div>
                <label className={labelClass}>Date of Birth <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="date" {...register("dob")} className={`${inputClass} pl-10`} />
                </div>
                {errors.dob && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.dob.message}</span>}
              </div>

              <div>
                <label className={labelClass}>Gender <span className="text-rose-500">*</span></label>
                <select {...register("gender")} className={inputClass}>
                  <option value="">Select Gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.gender.message}</span>}
              </div>

              <div>
                <label className={labelClass}>Nationality <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select {...register("nationality")} className={`${inputClass} pl-10`}>
                    <option value="">Select Nationality...</option>
                    <option value="Thai">Thai</option>
                    <option value="American">American</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.nationality && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.nationality.message}</span>}
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Religion <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input {...register("religion")} className={inputClass} placeholder="e.g. Buddhism" />
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <div className="bg-sky-100 p-2 rounded-lg">
                <Phone size={18} className="text-sky-600"/>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className={labelClass}>Phone Number <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="tel" {...register("phone")} className={`${inputClass} pl-10`} placeholder="081 234 5678" />
                </div>
                {errors.phone && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.phone.message}</span>}
              </div>

              <div>
                <label className={labelClass}>Email <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="email" {...register("email")} className={`${inputClass} pl-10`} placeholder="example@email.com" />
                </div>
                {errors.email && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.email.message}</span>}
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Address <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-4 text-slate-400" size={18} />
                  <textarea {...register("address")} rows={3} className={`${inputClass} pl-10 resize-none`} placeholder="123 Sukhumvit Rd..." />
                </div>
                {errors.address && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.address.message}</span>}
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Preferred Language <span className="text-rose-500">*</span></label>
                <select {...register("language")} className={inputClass}>
                  <option value="">Select Language...</option>
                  <option value="Thai">ภาษาไทย (Thai)</option>
                  <option value="English">English</option>
                </select>
                {errors.language && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{errors.language.message}</span>}
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <div className="bg-rose-100 p-2 rounded-lg">
                <User size={18} className="text-rose-500"/>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Emergency Contact <span className="text-slate-400 text-sm font-normal ml-1">(Optional)</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className={labelClass}>Contact Name</label>
                <input {...register("emergencyName")} className={inputClass} placeholder="e.g. Somsri Jaidee" />
              </div>

              <div>
                <label className={labelClass}>Relationship</label>
                <input {...register("emergencyRelation")} className={inputClass} placeholder="e.g. Mother, Spouse" />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-lg py-4 rounded-2xl transition-all duration-300 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 flex justify-center items-center gap-2">
              Submit Information
              <Send size={18} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
