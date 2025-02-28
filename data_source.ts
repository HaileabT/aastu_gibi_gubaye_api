import {DataSource} from 'typeorm';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'gebigubye.db',
  entities:
    process.env.NODE_ENV === 'production'
      ? [__dirname + '/models/**/*.js']
      : [__dirname + '/models/**/*.ts'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
});
