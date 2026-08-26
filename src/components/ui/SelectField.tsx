import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: string;
  icon?: ReactNode;
  options: Option[];
  placeholder?: string;
}

export function SelectField({
  label,
  required,
  register,
  error,
  icon,
  options,
  placeholder = "Select...",
}: SelectFieldProps) {
  const inputClass = "w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-700 shadow-sm";
  const labelClass = "text-sm font-semibold text-slate-700 mb-1.5 ml-1 block";

  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        
        <select {...register} className={`${inputClass} ${icon ? "pl-10" : ""}`}>
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{error}</span>}
    </div>
  );
}
