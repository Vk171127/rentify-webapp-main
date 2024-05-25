import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNo: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
});
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: "Password is required" }),
});

export type userSchemaType = z.infer<typeof userSchema>
