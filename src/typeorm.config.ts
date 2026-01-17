import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'aadhya',
  password: 'super_secret_password',
  database: 'aadhya',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
