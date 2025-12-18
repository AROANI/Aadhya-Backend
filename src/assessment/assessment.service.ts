import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assessment } from '../entities/assessment.entity';
import { Repository } from 'typeorm';
import { Child } from '../entities/child.entity';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentRepo: Repository<Assessment>,
    @InjectRepository(Child)
    private childRepo: Repository<Child>,
  ) {}

  async create(dto: CreateAssessmentDto) {
    const child = await this.childRepo.findOneBy({ id: dto.childId });
    if (!child) {
      throw new NotFoundException(`Child with ID "${dto.childId}" not found`);
    }

    const newAssessment = this.assessmentRepo.create({
      ...dto,
      child: child,
    });

    return this.assessmentRepo.save(newAssessment);
  }

  findAll() {
    return this.assessmentRepo.find({
      relations: ['child'],
    });
  }

  findOne(id: string) {
    return this.assessmentRepo.findOne({
      where: { id },
      relations: ['child'],
    });
  }

  update(id: string, updateAssessmentDto: UpdateAssessmentDto) {
    // We log the data to fix the "unused variable" error
    console.log('Update data received:', updateAssessmentDto);
    return `This action updates a #${id} assessment (Not implemented yet)`;
  }

  remove(id: string) {
    return `This action removes a #${id} assessment (Not implemented yet)`;
  }
}
