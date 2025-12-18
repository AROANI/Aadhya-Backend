import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  Version,
} from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller({
  path: 'children',
  version: '1',
})
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Get()
  @Version('1')
  async getAllChildren(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.childService.getAllChildren(page, limit);
  }

  @Get(':childId')
  @Version('1')
  async getChildById(@Param('childId', new ParseUUIDPipe()) childId: string) {
    return this.childService.getChildById(childId);
  }

  @Post()
  @Version('1')
  async createChild(@Body() dto: CreateChildDto) {
    return this.childService.createChild(dto);
  }

  @Put(':childId')
  @Version('1')
  async updateChild(@Param('childId') childId: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childService.updateChild(childId, updateChildDto);
  }

  @Delete(':childId')
  @Version('1')
  async softDeleteChild(@Param('childId') childId: string) {
    return this.childService.softDeleteChild(childId);
  }
}
