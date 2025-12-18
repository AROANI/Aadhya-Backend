import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Load environment variables from .env file
dotenvConfig({ path: '.env' });

// typeorm config parameters
export const typeormConfig = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

// Register the TypeORM configuration using @nestjs/config
export default registerAs('typeorm', () => typeormConfig);

// Create a DataSource instance for database connection
export const connectionSource = new DataSource(typeormConfig as DataSourceOptions);
