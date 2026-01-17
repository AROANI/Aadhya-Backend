import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Child } from 'src/entities/child.entity';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
  ) {}

  // --- 1. GET ALL ---
  async getAllChildren(page: number, limit: number): Promise<any> {
    const [data, total] = await this.childRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  // --- 2. GET ONE ---
  async getChildById(childId: string): Promise<any> {
    const child = await this.childRepository.findOne({ where: { id: childId } });
    if (!child) throw new NotFoundException(`Child not found`);
    return child;
  }

  // --- 3. CREATE (FIXED) ---
  async createChild(dto: CreateChildDto) {
    const newChild = this.childRepository.create({
      name: dto.name,
      yob: 2010, // 👈 WE ADD THIS! The DB needs a year, so we give it a dummy one.
      // ngo is left undefined, which is fine (it will be null)
    });

    return await this.childRepository.save(newChild);
  }

  // --- 4. UPDATE ---
  async updateChild(childId: string, updateChildDto: UpdateChildDto) {
    // Simple update without NGO complexity
    await this.childRepository.update(childId, updateChildDto);
    return this.getChildById(childId);
  }

  // --- 5. DELETE ---
  async softDeleteChild(childId: string): Promise<any> {
    await this.childRepository.softDelete(childId);
    return `Deleted`;
  }
}
