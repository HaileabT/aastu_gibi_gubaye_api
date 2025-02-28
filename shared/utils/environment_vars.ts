import {configDotenv} from 'dotenv';
configDotenv();

export const envs = {
  _JWT_SECRET: process.env.JWT_SECRET ?? 'aastu-gibi-gubaye',
  _FRONTEND_URL: process.env.FRONTEND_URL,
};
