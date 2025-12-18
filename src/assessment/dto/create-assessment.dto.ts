import { IsNotEmpty, IsString, IsObject, IsUUID } from 'class-validator';

export class CreateAssessmentDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  respondent: string;

  @IsObject()
  @IsNotEmpty()
  answers: Record<string, any>;

  @IsUUID()
  @IsNotEmpty()
  childId: string;
}
