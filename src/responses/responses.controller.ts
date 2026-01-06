import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Get('user')
  getStudent() {
    return this.responsesService.getStudent();
  }

  @Get('question')
  getQuestion() {
    return this.responsesService.getQuestion();
  }

  // 📊 THIS IS THE NEW PART FOR THE CHART
  @Get('score/:childId')
  getScores(@Param('childId') childId: string) {
    return this.responsesService.getScores(childId);
  }

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
