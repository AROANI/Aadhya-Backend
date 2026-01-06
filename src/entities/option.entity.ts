import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string; // e.g., "Very Positive", "Agree"

  @Column('int')
  weight: number; // e.g., 5, 2, 0, -2, -5

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}
