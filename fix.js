const fs = require('fs');
let c = fs.readFileSync('src/components/PatientForm.tsx', 'utf8');

c = c.replace('import { InputField } from "@/components/ui/InputField";', 'import { InputField } from "@/components/ui/InputField";\nimport { PhoneField } from "@/components/ui/PhoneField";\nimport { Control } from "react-hook-form";');

// Find and replace the Phone InputField block
const phoneBlockRegex = /<InputField\s+label="Phone Number"[\s\S]*?register=\{register\("phone"\)\}\s+error=\{errors\.phone\?\.message\}\s+\/>/;
c = c.replace(phoneBlockRegex, '<PhoneField\n                label="Phone Number"\n                required\n                control={control}\n                name="phone"\n                error={errors.phone?.message}\n              />');

// Add control to useForm destructuring
c = c.replace('register,\n    handleSubmit,\n    watch,\n    formState: { errors },', 'register,\n    control,\n    handleSubmit,\n    watch,\n    formState: { errors },');

fs.writeFileSync('src/components/PatientForm.tsx', c, 'utf8');
