import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  // ✅ 1. Get User (This was in your logs)
  @Get('user')
  getStudent() {
    return this.responsesService.getStudent();
  }

  // ✅ 2. Get Random Question (MISSING in your logs)
  @Get('question')
  getQuestion() {
    return this.responsesService.getQuestion();
  }

  // ✅ 3. Get Scores for Chart (MISSING in your logs)
  @Get('score/:childId')
  getScores(@Param('childId') childId: string) {
    return this.responsesService.getScores(childId);
  }

  // ✅ 4. Submit Answer (MISSING in your logs)
  @Post()
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responsesService.create(createResponseDto);
  }

  @Get()
  findAll() {
    return this.responsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.responsesService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsesService.remove(id);
  }
}
