"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Calendar, MapPin, Phone, Mail, Globe, HeartPulse, Send } from "lucide-react";
import { patientFormSchema, PatientFormData } from "@/schemas/patientSchema";
import { usePatientSync } from "@/hooks/usePatientSync";
import { InputField } from "@/components/ui/InputField";
import { PhoneField } from "@/components/ui/PhoneField";
import { Control } from "react-hook-form";
import { SelectField } from "@/components/ui/SelectField";

export default function PatientForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
  });

  const formValues = watch();
  
  // Custom Hook to handle all Realtime syncing logic
  const { setPresence } = usePatientSync(formValues, isSubmitted, setIsSubmitted);

  const onSubmit = async (data: PatientFormData) => {
    console.log("Form Submitted:", data);
    setIsSubmitted(true);
    setPresence('submitted');
    
    // Hide the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {isSubmitted && (
        <div className="mb-6 bg-emerald-100 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-emerald-500 rounded-full w-2.5 h-2.5 animate-pulse"></div>
          <p className="font-semibold">Information submitted successfully! The staff has been notified.</p>
        </div>
      )}
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
            Patient Registration Form - Please provide your accurate information.
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
              <InputField
                label="First Name"
                required
                placeholder="e.g. Somchai"
                register={register("firstName")}
                error={errors.firstName?.message}
              />

              <InputField
                label="Middle Name"
                optional
                placeholder="-"
                register={register("middleName")}
                error={errors.middleName?.message}
              />

              <InputField
                label="Last Name"
                required
                placeholder="e.g. Jaidee"
                register={register("lastName")}
                error={errors.lastName?.message}
              />

              <InputField
                label="Date of Birth"
                type="date"
                required
                icon={<Calendar size={18} />}
                register={register("dob")}
                error={errors.dob?.message}
              />

              <SelectField
                label="Gender"
                required
                register={register("gender")}
                error={errors.gender?.message}
                placeholder="Select Gender..."
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />

              <SelectField
                label="Nationality"
                required
                icon={<Globe size={18} />}
                register={register("nationality")}
                error={errors.nationality?.message}
                placeholder="Select Nationality..."
                options={[
                  { value: "Thai", label: "Thai" },
                  { value: "American", label: "American" },
                  { value: "Japanese", label: "Japanese" },
                  { value: "Other", label: "Other" },
                ]}
              />

              <div className="md:col-span-2">
                <InputField
                  label="Religion"
                  optional
                  placeholder="e.g. Buddhism"
                  register={register("religion")}
                  error={errors.religion?.message}
                />
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
              <PhoneField
                label="Phone Number"
                required
                control={control}
                name="phone"
                error={errors.phone?.message}
              />

              <InputField
                label="Email"
                type="email"
                required
                icon={<Mail size={18} />}
                placeholder="example@email.com"
                register={register("email")}
                error={errors.email?.message}
              />

              <div className="md:col-span-2">
                <InputField
                  label="Address"
                  isTextarea
                  rows={3}
                  required
                  icon={<MapPin size={18} />}
                  placeholder="123 Sukhumvit Rd..."
                  register={register("address")}
                  error={errors.address?.message}
                />
              </div>

              <div className="md:col-span-2">
                <SelectField
                  label="Preferred Language"
                  required
                  register={register("language")}
                  error={errors.language?.message}
                  placeholder="Select Language..."
                  options={[
                    { value: "Thai", label: "ภาษาไทย (Thai)" },
                    { value: "English", label: "English" },
                  ]}
                />
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
              <InputField
                label="Contact Name"
                placeholder="e.g. Somsri Jaidee"
                register={register("emergencyName")}
                error={errors.emergencyName?.message}
              />

              <InputField
                label="Relationship"
                placeholder="e.g. Mother, Spouse"
                register={register("emergencyRelation")}
                error={errors.emergencyRelation?.message}
              />
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
