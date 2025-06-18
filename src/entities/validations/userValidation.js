import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  area: z.string().min(1, 'Area is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  referedBy: z.string().optional(),
  role: z.string().optional(),
  isVerified: z.boolean().optional()
});
