import { z } from 'zod'

const addUserJsonValidationSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .max(255),
    email: z
      .email(),
    password: z
      .string()
      .min(6)
      .max(255),
    confirmPassword: z
      .string()
      .min(6)
      .max(255),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
    },
  )

export default addUserJsonValidationSchema
