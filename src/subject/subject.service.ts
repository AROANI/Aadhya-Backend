import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
  ) {}

  create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectRepo.create(createSubjectDto);
    return this.subjectRepo.save(subject);
  }

  findAll() {
    return this.subjectRepo.find();
  }

  async findOne(id: string) {
    const subject = await this.subjectRepo.findOneBy({ id });
    if (!subject) {
      throw new NotFoundException(`Subject with ID "${id}" not found`);
    }
    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.findOne(id);
    this.subjectRepo.merge(subject, updateSubjectDto);
    return this.subjectRepo.save(subject);
  }

  async remove(id: string) {
    const result = await this.subjectRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subject with ID "${id}" not found`);
    }
    return { message: 'Subject deleted successfully' };
  }
}
