import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import * as C from '../constants';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: C.POSTGRES_HOST,
  port: C.POSTGRES_PORT,
  username: C.POSTGRES_USERNAME,
  password: C.POSTGRES_PASSWORD,
  database: C.POSTGRES_DATABASE,
  schema: 'public',
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: ['src/db/migrations/*{.ts,.js}'],
});
