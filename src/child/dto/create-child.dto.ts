import { IsString, IsInt, Min, Max, IsNotEmpty, IsUUID } from 'class-validator';
export class CreateChildDto {
  @IsString()
  name: string;

  @IsUUID() // <-- Ensures it's a valid UUID
  @IsNotEmpty() // <-- Makes it a required field
  ngoId: string;

  @IsInt() // its int
  @Min(1900) // in or after 1900 (assuming other to be adults).
  @Max(new Date().getFullYear()) // avoid future values
  yob: number;
}
