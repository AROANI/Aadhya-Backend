import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from 'src/entities/child.entity';
import { Ngo } from '../entities/ngo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Child]), TypeOrmModule.forFeature([Ngo])],
  controllers: [ChildController],
  providers: [ChildService],
})
export class ChildModule {}
