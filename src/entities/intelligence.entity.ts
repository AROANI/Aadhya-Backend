import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { StudentScore } from './student-score.entity';

@Entity()
export class Intelligence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "Logical-Mathematical"

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Question, (question) => question.intelligence)
  questions: Question[];

  @OneToMany(() => StudentScore, (score) => score.intelligence)
  scores: StudentScore[];
}
