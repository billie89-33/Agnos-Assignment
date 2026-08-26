import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneFieldProps {
  label: string;
  required?: boolean;
  control: any;
  name: string;
  error?: string;
}

export function PhoneField({
  label,
  required,
  control,
  name,
  error,
}: PhoneFieldProps) {
  const inputClass = "w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-700 shadow-sm";
  const labelClass = "text-sm font-semibold text-slate-700 mb-1.5 ml-1 block";

  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              international
              defaultCountry="TH"
              value={value}
              onChange={onChange}
              className={inputClass}
              style={{ paddingLeft: '1rem' }}
            />
          )}
        />
      </div>
      
      {error && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{error}</span>}
    </div>
  );
}
