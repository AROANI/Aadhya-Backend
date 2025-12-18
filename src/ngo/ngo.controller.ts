import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version, // <-- Import Version
} from '@nestjs/common';
import { NgoService } from './ngo.service';
import { CreateNgoDto } from './dto/create-ngo.dto';
import { UpdateNgoDto } from './dto/update-ngo.dto';

@Controller('ngo')
export class NgoController {
  constructor(private readonly ngoService: NgoService) {}

  @Post()
  @Version('1') // <-- Add Version
  create(@Body() createNgoDto: CreateNgoDto) {
    return this.ngoService.create(createNgoDto);
  }

  @Get()
  @Version('1') // <-- Add Version
  findAll() {
    return this.ngoService.findAll();
  }

  @Get(':id')
  @Version('1') // <-- Add Version
  findOne(@Param('id') id: string) {
    return this.ngoService.findOne(id);
  }

  @Patch(':id')
  @Version('1') // <-- Add Version
  update(@Param('id') id: string, @Body() updateNgoDto: UpdateNgoDto) {
    return this.ngoService.update(id, updateNgoDto);
  }

  @Delete(':id')
  @Version('1') // <-- Add Version
  remove(@Param('id') id: string) {
    return this.ngoService.remove(id);
  }
}
