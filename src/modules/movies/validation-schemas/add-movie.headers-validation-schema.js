import { z } from 'zod'

const addMovieHeadersValidationSchema = z
  .object({
    'content-type': z
      .string()
      .refine(
        (value) => value === 'application/json',
        {
          message: 'Content-Type should be application/json',
        },
      ),
  })

export default addMovieHeadersValidationSchema