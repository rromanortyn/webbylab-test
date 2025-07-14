import { z } from 'zod'

const importMoviesFormValidationSchema = z
  .object({
    movies: z.object({
      fieldname: z.string(),
      originalname: z.string().min(1, 'Missing original filename'),
      encoding: z.string(),
      mimetype: z.string(),
      size: z.number(),
      buffer: z.instanceof(Buffer),
    })
  })

export default importMoviesFormValidationSchema
