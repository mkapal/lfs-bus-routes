import { Tedis } from "tedis";

export const redis = new Tedis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT ?? "", 10),
  password: process.env.REDIS_PASSWORD,
});
