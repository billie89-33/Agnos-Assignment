import * as z from "zod";

export const patientFormSchema = z.object({
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

export type PatientFormData = z.infer<typeof patientFormSchema>;
