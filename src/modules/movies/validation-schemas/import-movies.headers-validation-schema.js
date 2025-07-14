import { z } from 'zod'

const importMoviesHeadersValidationSchema = z
  .object({
    'content-type': z
      .string()
      .refine(
        (value) => value === 'multipart/form-data',
        {
          message: 'Content-Type should be multipart/form-data',
        },
      ),
  })

export default importMoviesHeadersValidationSchema