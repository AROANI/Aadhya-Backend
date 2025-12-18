import { PartialType } from '@nestjs/mapped-types';
import { CreateNgoDto } from './create-ngo.dto';

export class UpdateNgoDto extends PartialType(CreateNgoDto) {}
