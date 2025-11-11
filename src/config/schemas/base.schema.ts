import z from 'zod';

export const baseSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().min(1).max(65535),
  DATABASE_URL: z.url()
});

export type Baseconfig = z.infer<typeof baseSchema>;
