"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Calendar, MapPin, Phone, Mail, Globe, HeartPulse } from "lucide-react";

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
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: PatientFormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <HeartPulse size={32} />
            <h1 className="text-2xl font-bold tracking-wide">Agnos Hospital</h1>
          </div>
          <p className="text-blue-100 mt-1">📝 Patient Registration Form. Please fill in your information below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">
          
          {/* Personal Details */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
              <User size={20} className="text-blue-600"/>
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                <input {...register("firstName")} className="p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. Somchai" />
                {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Middle Name <span className="text-gray-400 text-xs">(Optional)</span></label>
                <input {...register("middleName")} className="p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="-" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                <input {...register("lastName")} className="p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. Jaidee" />
                {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="date" {...register("dob")} className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-700" />
                </div>
                {errors.dob && <span className="text-xs text-red-500">{errors.dob.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
                <select {...register("gender")} className="p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-700">
                  <option value="">Select Gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="text-xs text-red-500">{errors.gender.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Nationality <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select {...register("nationality")} className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-700">
                    <option value="">Select Nationality...</option>
                    <option value="Thai">Thai</option>
                    <option value="American">American</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.nationality && <span className="text-xs text-red-500">{errors.nationality.message}</span>}
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Religion <span className="text-gray-400 text-xs">(Optional)</span></label>
                <input {...register("religion")} className="p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. Buddhism" />
              </div>

            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
              <Phone size={20} className="text-blue-600"/>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="tel" {...register("phone")} className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="0812345678" />
                </div>
                {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" {...register("email")} className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="example@email.com" />
                </div>
                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-4 text-gray-400" size={18} />
                  <textarea {...register("address")} rows={3} className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none" placeholder="123 Sukhumvit Rd..." />
                </div>
                {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Preferred Language <span className="text-red-500">*</span></label>
                <select {...register("language")} className="p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-700">
                  <option value="">Select Language...</option>
                  <option value="Thai">Thai</option>
                  <option value="English">English</option>
                </select>
                {errors.language && <span className="text-xs text-red-500">{errors.language.message}</span>}
              </div>

            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
              <User size={20} className="text-red-500"/>
              Emergency Contact <span className="text-gray-400 text-sm font-normal">(Optional)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Contact Name</label>
                <input {...register("emergencyName")} className="p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. Somsri Jaidee" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Relationship</label>
                <input {...register("emergencyRelation")} className="p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. Mother" />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition duration-200 shadow-md hover:shadow-lg flex justify-center items-center gap-2">
              Submit Information
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
