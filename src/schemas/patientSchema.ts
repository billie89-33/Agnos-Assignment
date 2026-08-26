import * as z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const patientFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  religion: z.string().optional(),
  phone: z.string().min(1, "Phone Number is required").refine((val) => {
    // If it's 10 digits exactly without country code, it's valid
    if (/^\d{10}$/.test(val)) return true;
    // Or validate using react-phone-number-input
    return isValidPhoneNumber(val);
  }, "ต้องระบุเป็นตัวเลข 10 หลัก (หรือรูปแบบเบอร์โทรที่ถูกต้อง)"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  language: z.string().min(1, "Preferred Language is required"),
  emergencyName: z.string().optional(),
  emergencyRelation: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;
