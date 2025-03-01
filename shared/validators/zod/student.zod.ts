import {literal, z} from 'zod';

export const createStudentSchema = z.object({
  first_name: z.string().max(100, 'Exceeded the max string length for names'),
  last_name: z.string().max(100, 'Exceeded the max string length for names'),
  student_id: z
    .string()
    .length(10, 'Invalid student ID has been provided')
    .regex(/^(ETS)/, 'Student id must start with ETS'),
  phone_number: z
    .string()
    .regex(/(\+251|0)[0-9]{9}/, 'Invalid phone number provided'),
  gender: z.enum(['male', 'female']),
  baptismal_name: z.string().max(256, 'Name overflowed memory.').optional(),
  email: z.string().email('Invalid email address').optional().or(literal('')),
  role: z
    .enum(['std-user', 'vice_admin', 'admin', 'Super-admin', 'Enroller'])
    .optional(),
  current_year: z.string().optional(),
  service: z.string().array().optional(),
  department: z.string(),
  confession: z.string().optional(),
  language: z.string().array(),
});
