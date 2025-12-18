import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  // We accept any string for now to make testing easy
  phone: string;

  @IsString()
  @IsOptional()
  role?: string;
}
