import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Version('1')
  @Post()
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentService.create(createAssessmentDto);
  }

  @Version('1')
  @Get()
  findAll() {
    return this.assessmentService.findAll();
  }

  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assessmentService.findOne(id); // NO '+' HERE
  }

  @Version('1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssessmentDto: UpdateAssessmentDto) {
    return this.assessmentService.update(id, updateAssessmentDto); // NO '+' HERE
  }

  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assessmentService.remove(id); // NO '+' HERE
  }
}
