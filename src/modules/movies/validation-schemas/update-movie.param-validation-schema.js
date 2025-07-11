import { z } from 'zod'

const updateMovieParamValidationSchema = z
  .object({
    id: z
      .coerce
      .number()
      .min(1),
  })

export default updateMovieParamValidationSchema
