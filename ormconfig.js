const env = require('dotenv').config();
module.exports = {
  type: 'postgres',
  host: env.parsed.DB_HOST,
  port: env.parsed.DB_PORT,
  username: env.parsed.DB_USER,
  password: env.parsed.DB_PASSWORD,
  database: env.parsed.DB_DATABASE,
  entities: ['src/app/models/*.ts'],
  synchronize: true,
  migrationsTableName: 'migration',
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};