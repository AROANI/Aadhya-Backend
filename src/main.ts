import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS globally
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}

export default bootstrap();
