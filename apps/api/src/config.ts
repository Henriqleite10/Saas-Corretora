import { carregarEnvRaiz } from "@radar/db";
import { z } from "zod";

const ConfigSchema = z.object({
  API_PORT: z.coerce.number().int().default(3001),
  WEB_URL: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1),
  DATABASE_URL_APP: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  MASTER_KEY: z.string().min(1),
  DOC_HASH_KEY: z.string().min(1),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type Config = z.infer<typeof ConfigSchema>;

let cache: Config | undefined;

export function config(): Config {
  if (!cache) {
    carregarEnvRaiz();
    cache = ConfigSchema.parse(process.env);
  }
  return cache;
}
