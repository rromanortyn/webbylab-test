import { z } from 'zod'

const addMovieJsonValidationSchema = z
  .object({
    title: z
      .string(),
    year: z
      .number(),
    format: z
      .string(),
    actors: z
      .array(z.string()),
  })

export default addMovieJsonValidationSchema
