import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Intelligence } from './intelligence.entity';
import { Option } from './option.entity';
import { Assessment } from './assessment.entity'; // 👈 NEW IMPORT

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string; // e.g., "I like solving puzzles"

  @ManyToOne(() => Intelligence, (intelligence) => intelligence.questions)
  intelligence: Intelligence;

  // 👇 NEW: Link Question to Assessment
  @ManyToOne(() => Assessment, (assessment) => assessment.questions)
  assessment: Assessment;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}
