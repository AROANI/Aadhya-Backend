import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNgoDto } from './dto/create-ngo.dto';
import { UpdateNgoDto } from './dto/update-ngo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ngo } from '../entities/ngo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NgoService {
  constructor(
    @InjectRepository(Ngo)
    private readonly ngoRepository: Repository<Ngo>,
  ) {}

  // This will NOW SAVE to the database
  create(createNgoDto: CreateNgoDto) {
    const newNgo = this.ngoRepository.create(createNgoDto);
    return this.ngoRepository.save(newNgo);
  }

  // This will NOW FIND all from the database
  findAll() {
    return this.ngoRepository.find();
  }

  async findOne(id: string) {
    const ngo = await this.ngoRepository.findOneBy({ id });

    if (!ngo) {
      throw new NotFoundException(`NGO with ID "${id}" not found`);
    }

    return ngo;
  }

  async update(id: string, updateNgoDto: UpdateNgoDto) {
    // Find the NGO by id and preload it with new data
    const ngo = await this.ngoRepository.preload({
      id: id,
      ...updateNgoDto,
    });

    // Check if the NGO was found
    if (!ngo) {
      throw new NotFoundException(`NGO with ID "${id}" not found`);
    }

    // Save the updated NGO back to the database
    return this.ngoRepository.save(ngo);
  }

  async remove(id: string) {
    // Find the NGO first. This will throw an error if it's not found.
    const ngo = await this.findOne(id);

    // If found, remove it
    await this.ngoRepository.remove(ngo);

    return { deleted: true }; // Send back a confirmation
  }
}
