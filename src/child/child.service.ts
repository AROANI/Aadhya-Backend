import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Child } from 'src/entities/child.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Ngo } from '../entities/ngo.entity';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
    @InjectRepository(Ngo) // <-- ADD THIS
    private readonly ngoRepository: Repository<Ngo>, // <-- ADD THIS
  ) {}

  async getAllChildren(page: number, limit: number): Promise<any> {
    const [data, total] = await this.childRepository
      .createQueryBuilder('child')
      .leftJoinAndSelect('child.ngo', 'ngo')
      .where('child.deletedAt IS NULL')
      .orderBy('child.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getChildById(childId: string): Promise<any> {
    const child = await this.childRepository
      .createQueryBuilder('child')
      .leftJoinAndSelect('child.ngo', 'ngo')
      .where('child.id = :childId', { childId })
      .andWhere('child.deletedAt IS NULL')
      .getOne();

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found.`);
    }

    return child;
  }

  async createChild(dto: CreateChildDto) {
    // Find the NGO first
    const ngo = await this.ngoRepository.findOneBy({ id: dto.ngoId });
    if (!ngo) {
      throw new NotFoundException(`NGO with ID "${dto.ngoId}" not found`);
    }

    // Create the new child and link the found NGO object
    const newChild = this.childRepository.create({
      ...dto, // <-- copies name, yob, etc.
      ngo: ngo, // <-- assigns the full NGO object
    });

    return this.childRepository.save(newChild);
  }

  async updateChild(childId: string, updateChildDto: UpdateChildDto) {
    // 1. Separate the ngoId from the rest of the DTO
    const { ngoId, ...restOfData } = updateChildDto;

    let ngo: Ngo | null = null;

    // 2. If a new ngoId was sent, find the NGO
    if (ngoId) {
      ngo = await this.ngoRepository.findOneBy({ id: ngoId });
      if (!ngo) {
        throw new NotFoundException(`NGO with ID "${ngoId}" not found`);
      }
    }

    // 3. Preload the child with the simple data (name, yob, etc.)
    const child = await this.childRepository.preload({
      id: childId,
      ...restOfData,
    });

    // 4. Check if child exists (your code already does this)
    if (!child || child.deletedAt) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    // 5. If we found a new NGO, attach it to the child
    if (ngo) {
      child.ngo = ngo;
    }

    // 6. Save the child
    return this.childRepository.save(child);
  }

  async softDeleteChild(childId: string): Promise<any> {
    const child = await this.childRepository.findOne({
      where: { id: childId, deletedAt: IsNull() },
    });

    if (!child) {
      throw new NotFoundException(`Child with id ${childId} not found or already deleted`);
    }

    child.deletedAt = new Date();
    await this.childRepository.save(child);

    const successMsg = `Child with id ${childId} has been soft deleted.`;
    return successMsg;
  }
}
