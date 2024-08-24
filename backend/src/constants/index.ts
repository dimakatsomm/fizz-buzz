import 'dotenv/config';
import { env } from 'process';

export const PORT: number = Number(env.PORT || '3000');

// DATABASE
export const POSTGRES_HOST: string = env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT: number = Number(env.POSTGRES_PORT || '5455');
export const POSTGRES_USERNAME: string = env.POSTGRES_USERNAME || 'postgres';
export const POSTGRES_PASSWORD: string = env.POSTGRES_PASSWORD || 'postgres';
export const POSTGRES_DATABASE: string = env.POSTGRES_DATABASE || 'fizz_buzz';
