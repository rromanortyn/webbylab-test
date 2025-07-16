import { z } from 'zod'

const importMoviesFormValidationSchema = z
  .object({
    fieldname: z.string(),
    originalname: z.string().min(1, 'Missing original filename'),
    encoding: z.string(),
    mimetype: z
      .string()
      .refine(
        (value) => value === 'application/json',
        {
          error: 'should be application/json',
        },
      ),
    size: z.number(),
    buffer: z.instanceof(Buffer),
  })

export default importMoviesFormValidationSchema
