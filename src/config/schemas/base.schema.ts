import z from 'zod';

export const baseSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().min(1).max(65535),
  DATABASE_URL: z.url()
});

export const jwtSchema = z.object({
  ACCESS_JWT_SECRET: z.string().min(32),
  ACCESS_JWT_TTL: z.coerce.number().int().positive()
});

export const thaiBulkSmsSchema = z.object({
  THAIBULKSMS_API_KEY: z.string().min(1),
  THAIBULKSMS_SECRET_KEY: z.string().min(1)
});

export type Baseconfig = z.infer<typeof baseSchema>;
export type JwtConfig = z.infer<typeof jwtSchema>;
export type ThaiBulkSmsConfig = z.infer<typeof thaiBulkSmsSchema>;
