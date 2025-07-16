import { z } from 'zod'

const deleteMovieParamValidationSchema = z
  .object({
    id: z
      .coerce
      .number()
      .min(1),
  })

export default deleteMovieParamValidationSchema
