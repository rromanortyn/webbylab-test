import { z } from 'zod'

const getMoviesQueryValidationSchema = z
  .object({
    actor: z
      .string()
      .min(1)
      .optional(),
    title: z
      .string()
      .min(1)
      .optional(),
    search: z
      .string()
      .min(1)
      .optional(),
    sort: z
      .enum(['id', 'title', 'year'])
      .optional()
      .default('id'),
    order: z
      .enum(['ASC', 'DESC'])
      .optional()
      .default('ASC'),
    limit: z
      .coerce
      .number()
      .min(1)
      .optional()
      .default(20),
    offset: z
      .coerce
      .number()
      .min(0)
      .optional()
      .default(0),
  })

export default getMoviesQueryValidationSchema
