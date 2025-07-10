import { z } from 'zod'

const startSessionJsonValidationSchema = z
  .object({
    email: z
      .email(),
    password: z
      .string()
      .min(6)
      .max(255),
  })

export default startSessionJsonValidationSchema
