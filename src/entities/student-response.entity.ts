import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Child } from './child.entity';
import { Question } from './question.entity';
import { Option } from './option.entity';

@Entity()
export class StudentResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Child)
  child: Child;

  @ManyToOne(() => Question)
  question: Question;

  @ManyToOne(() => Option)
  selectedOption: Option;
}
