import { z } from "zod";


export const passwordResetFormSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => 
  data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  }
)

export const resetPasswordEmailFormSchema = z.object({
  email: z.string().email("Invalid email address"),
}).refine(data => {
  data.email = data.email.toLowerCase()
  return true
})