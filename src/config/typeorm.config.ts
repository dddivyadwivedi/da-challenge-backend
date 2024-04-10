/* eslint-disable @typescript-eslint/no-var-requires */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const sync: boolean = process.env.DB_SYNC && process.env.DB_SYNC === 'true';

//console.log(host, database, username, password, 'database==========', sync);

const ORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: [__dirname + '/../../dist/entity/**/*.entity{.js,.ts}'], //[path.join(__dirname, '/../**/*.entity.ts')],
  // entities: [__dirname + '/../**/*.entity{.js,.ts}'], //[path.join(__dirname, '/../**/*.entity.ts')],
  synchronize: sync, // turn false in production,

  logging: true,
  logger: 'file',

  migrations: ['dist/migration/**/*.js'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  // cli: {
  //   //   // entitiesDir: path.join(__dirname + '/../entity/'),
  //   //   // migrationsDir: path.join(__dirname + '/../migration/'),
  //   migrationsDir: 'src/migration',
  // },
  // cache: {
  //   type: 'redis',
  //   duration: 10000,
  // },
};

export = ORMConfig;
