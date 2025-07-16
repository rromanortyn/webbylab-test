import { z } from 'zod'

const importMoviesHeadersValidationSchema = z
  .object({
    'content-type': z
      .string()
      .refine(
        (value) => {
          const contentTypeParts = value
            .split(';')
            .map((str) => str.trim())

          let contentType

          if (contentTypeParts.length === 0) {
            return false
          }

          contentType = contentTypeParts[0]

          if (contentType === 'multipart/form-data') {
            return true
          }

          return false
        },
        {
          message: 'Content-Type should be multipart/form-data',
        },
      ),
  })

export default importMoviesHeadersValidationSchema