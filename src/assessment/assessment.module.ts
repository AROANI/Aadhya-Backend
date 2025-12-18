import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from '../entities/assessment.entity'; // Correct path
import { Child } from '../entities/child.entity'; // Need this to link them

@Module({
  imports: [TypeOrmModule.forFeature([Assessment, Child])],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
