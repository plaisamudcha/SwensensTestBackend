import z from 'zod';
import { baseSchema, jwtSchema, thaiBulkSmsSchema } from './base.schema';

export const envSchema = baseSchema.and(jwtSchema).and(thaiBulkSmsSchema);

export type EnvConfig = z.infer<typeof envSchema>;

export const validate = (config: Record<string, any>) => {
  const { success, data, error } = envSchema.safeParse(config);

  if (!success) {
    throw new Error(`env validation error \n${z.prettifyError(error)}`);
  }

  return data;
};
