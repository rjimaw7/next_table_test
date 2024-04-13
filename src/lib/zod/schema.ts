import { z } from 'zod';

export const OrderSchema = z.object({
  patient_name: z
    .string({
      required_error: 'Patient Name is Required'
    })
    .min(5, { message: 'Must be 5 or more characters long' }),
  patient_phone: z.string({
    required_error: 'Patient Phone is Required'
  }),
  doctor_phone: z.string({
    required_error: 'Doctor Phone is Required'
  }),
  status: z.string({
    required_error: 'Status is Required'
  }),
  notes: z.string().optional()
});

export type OrderType = z.infer<typeof OrderSchema>;
