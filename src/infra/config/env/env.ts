import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(1),
  JWT_TOKEN_EXPIRES_IN: z.string().min(1),
  JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS: z.coerce.number(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CLIENT_CALLBACK_URL: z.string().url(),
  API_APP_NAME: z.string().min(1),
  WEB_APP_URL: z.string().url(),
})
