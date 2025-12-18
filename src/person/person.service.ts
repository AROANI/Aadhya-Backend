import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepo: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    // Check if phone number already exists
    const existing = await this.personRepo.findOneBy({ phone: createPersonDto.phone });
    if (existing) {
      throw new ConflictException('Phone number already exists');
    }

    const person = this.personRepo.create(createPersonDto);
    return this.personRepo.save(person);
  }

  findAll() {
    return this.personRepo.find();
  }

  async findOne(id: string) {
    const person = await this.personRepo.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with ID "${id}" not found`);
    }
    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);
    this.personRepo.merge(person, updatePersonDto);
    return this.personRepo.save(person);
  }

  async remove(id: string) {
    const result = await this.personRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Person with ID "${id}" not found`);
    }
    return { message: 'Person deleted successfully' };
  }
}
