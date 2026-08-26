import { ReactNode } from "react";
import { Controller, Control } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFieldProps {
  label: string;
  required?: boolean;
  control: any;
  name: string;
  error?: string;
  icon?: ReactNode;
}

export function DateField({
  label,
  required,
  control,
  name,
  error,
  icon,
}: DateFieldProps) {
  const inputClass = "w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-700 shadow-sm";
  const labelClass = "text-sm font-semibold text-slate-700 mb-1.5 ml-1 block";

  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none">
            {icon}
          </div>
        )}
        
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              selected={value ? new Date(value) : null}
              onChange={(date: Date | null) => {
                // Ensure we save it as a string formatted YYYY-MM-DD for consistency
                if (date) {
                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                  const dd = String(date.getDate()).padStart(2, '0');
                  onChange(`${yyyy}-${mm}-${dd}`);
                } else {
                  onChange("");
                }
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className={`${inputClass} ${icon ? "pl-10" : ""}`}
              wrapperClassName="w-full"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
          )}
        />
      </div>
      
      {error && <span className="text-xs text-rose-500 mt-1 ml-1 block font-medium">{error}</span>}
    </div>
  );
}
