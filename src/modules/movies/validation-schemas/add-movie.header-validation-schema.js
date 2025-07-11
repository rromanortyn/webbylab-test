import { z } from 'zod'

const addMovieHeaderValidationSchema = z
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

export default addMovieHeaderValidationSchema