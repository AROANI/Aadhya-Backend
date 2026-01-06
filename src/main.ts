import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 🔓 ALLOW FRONTEND TO CONNECT (Fixes "No Questions Found")
  app.enableCors();

  // Ensure we listen on port 3001 to match your Frontend API_URL
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
