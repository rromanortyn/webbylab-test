import { z } from 'zod'

const getMovieByIdParamValidationSchema = z
  .object({
    id: z
      .coerce
      .number()
      .min(1),
  })

export default getMovieByIdParamValidationSchema
