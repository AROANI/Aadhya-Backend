import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PersonModule } from '../person/person.module'; // Import PersonModule

@Module({
  imports: [PersonModule], // We need this to check if users exist
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
