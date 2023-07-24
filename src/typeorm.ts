import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  // TODO: to move to config service
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'yc_wl_dev',
  migrations: ['dist/src/migrations/*.js'],
  migrationsTableName: 'migrations',
  entities: ['dist/**/*.entity.js'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

module.exports = { AppDataSource };
