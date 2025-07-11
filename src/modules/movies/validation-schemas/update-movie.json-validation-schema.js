import { z } from 'zod'

const updateMovieJsonValidationSchema = z
  .object({
    title: z
      .string()
      .optional(),
    year: z
      .number()
      .optional(),
    format: z
      .string()
      .optional(),
    actors: z
      .array(
        z
          .string()
          .min(1),
      )
      .optional(),
  })

export default updateMovieJsonValidationSchema
