import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMPGTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    // TODO: to move to config service
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '123',
    database: 'yc_wl_test',
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations',
    entities: [...entities],
    //    synchronize: true,
  });
