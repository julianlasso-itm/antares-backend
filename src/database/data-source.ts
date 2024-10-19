import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user_db_postgres',
  password: 'my_secret_password_postgres',
  database: 'antares_db_migration',
  // entities: [__dirname + '/entities/**/*.entity.ts'],
  entities: [
    __dirname + '/../common/modules/persistence/entities/**/*.entity.ts',
  ],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
});
