require('dotenv').config();

const settings = {
  type: 'postgres',
  synchronize: false,
  logger: 'simple-console',
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  ssl: process.env.POSTGRES_SSL === 'true',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['src/database/entities/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsRun: true,
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
  },
};


module.exports = settings;
