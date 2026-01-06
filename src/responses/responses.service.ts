/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/create-response.dto';

// Entities
import { StudentResponse } from '../entities/student-response.entity';
import { StudentScore } from '../entities/student-score.entity';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { Child } from '../entities/child.entity';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(StudentResponse)
    private responseRepo: Repository<StudentResponse>,
    @InjectRepository(StudentScore)
    private scoreRepo: Repository<StudentScore>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Option)
    private optionRepo: Repository<Option>,
    @InjectRepository(Child)
    private childRepo: Repository<Child>,
  ) {}

  // --- 🛡️ NEW: SELF-HEALING GET STUDENT ---
  async getStudent() {
    // 1. Try to find any student
    let student = await this.childRepo.findOne({ where: {} });

    // 2. If NO student exists, CREATE one immediately!
    if (!student) {
      console.log("⚠️ No student found. Creating 'Test Student' automatically...");
      student = this.childRepo.create({
        name: "Test Student",
        yob: 2015
      });
      await this.childRepo.save(student);
      console.log("✅ Created and Saved: Test Student");
    } else {
      console.log("✅ Found existing student:", student.name);
    }

    return student;
  }

  // --- UNBREAKABLE GET QUESTION ---
  async getQuestion() {
    const question = await this.questionRepo
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.options', 'options')
      .orderBy('RANDOM()')
      .getOne();

    if (!question) {
      console.log("❌ CRITICAL: No questions found in DB.");
      return null;
    }
    return question;
  }

  async create(createDto: CreateResponseDto) {
    const child = await this.childRepo.findOneBy({ id: createDto.childId });
    const question = await this.questionRepo.findOne({
      where: { id: createDto.questionId },
      relations: ['intelligence'],
    });
    const option = await this.optionRepo.findOneBy({ id: createDto.optionId });

    if (!child || !question || !option) {
      throw new NotFoundException('Child, Question, or Option not found');
    }

    const newResponse = this.responseRepo.create({
      child: child,
      question: question,
      selectedOption: option,
    });
    await this.responseRepo.save(newResponse);

    let scoreRecord = await this.scoreRepo.findOne({
      where: {
        child: { id: child.id },
        intelligence: { id: question.intelligence.id },
      },
    });

    if (!scoreRecord) {
      scoreRecord = this.scoreRepo.create({
        child: child,
        intelligence: question.intelligence,
        score: 50,
      });
    }

    let newScore = scoreRecord.score + option.weight;
    if (newScore > 100) newScore = 100;
    if (newScore < 0) newScore = 0;

    scoreRecord.score = newScore;
    await this.scoreRepo.save(scoreRecord);

    return {
      message: 'Response recorded',
      intelligence: question.intelligence.name,
      newScore: newScore,
    };
  }

  findAll() { return this.responseRepo.find(); }
  findOne(id: string) { return `This action returns a #${id} response`; }
  update(id: string) { return `This action updates a #${id} response`; }
  remove(id: string) { return `This action removes a #${id} response`; }
}