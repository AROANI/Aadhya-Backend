import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepo: Repository<Activity>,
  ) {}

  create(createActivityDto: CreateActivityDto) {
    const activity = this.activityRepo.create(createActivityDto);
    return this.activityRepo.save(activity);
  }

  findAll() {
    return this.activityRepo.find();
  }

  async findOne(id: string) {
    const activity = await this.activityRepo.findOneBy({ id });
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.findOne(id);
    this.activityRepo.merge(activity, updateActivityDto);
    return this.activityRepo.save(activity);
  }

  async remove(id: string) {
    const result = await this.activityRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    return { message: 'Activity deleted successfully' };
  }
}
