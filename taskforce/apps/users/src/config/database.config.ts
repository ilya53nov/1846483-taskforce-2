import { registerAs } from '@nestjs/config';

const DECIMAL_SYSTEM = 10;

export default registerAs('database', () => ({
  database: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: parseInt(process.env.MONGO_PORT, DECIMAL_SYSTEM),
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  authBase: process.env.MONGO_AUTH_BASE,
}));
