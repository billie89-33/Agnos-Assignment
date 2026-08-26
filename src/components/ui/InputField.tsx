import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

interface InputFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  icon?: ReactNode;
  isTextarea?: boolean;
  rows?: number;
}

export function InputField({
  label,
  required,
  optional,
  type = "text",
  placeholder,
  register,
  error,
  icon,
  isTextarea,
  rows,
}: InputFieldProps) {
  const inputClass = "w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-700 shadow-sm";
  const labelClass = "text-sm font-semibold text-slate-700 mb-1.5 ml-1 block";

  return (
    <div>
      <label className={labelClass}>
        {label}{" "}
        {required && <span className="text-rose-500">*</span>}
        {optional && <span className="text-slate-400 font-normal">(Optional)</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className={`absolute left-3.5 ${isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'} text-slate-400`}>
            {icon}
          </div>
        )}
        
        {isTextarea ? (
          <textarea
            {...register}
            rows={rows || 3}
            className={`${inputClass} ${icon ? "pl-10" : ""} resize-none`}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            {...register}
            className={`${inputClass} ${icon ? "pl-10" : ""}`}
            placeholder={placeholder}
          />
        )}
      </div>
      
      {error && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{error}</span>}
    </div>
  );
}
