import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';

// Import all entities used in this module
import { StudentResponse } from '../entities/student-response.entity';
import { StudentScore } from '../entities/student-score.entity';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { Child } from '../entities/child.entity';
import { Intelligence } from '../entities/intelligence.entity'; // <--- Added this

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentResponse,
      StudentScore,
      Question,
      Option,
      Child,
      Intelligence, // <--- Added this to the list
    ]),
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule {}
