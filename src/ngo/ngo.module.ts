import { Module } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { NgoController } from './ngo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ngo } from '../entities/ngo.entity'; // <-- Check this import path

@Module({
  imports: [TypeOrmModule.forFeature([Ngo])],
  controllers: [NgoController],
  providers: [NgoService],
})
export class NgoModule {}
