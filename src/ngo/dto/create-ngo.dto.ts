import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNgoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional() // This field is optional
  address: string;

  @IsString()
  @IsOptional() // This field is optional
  phoneNumber: string;
}
