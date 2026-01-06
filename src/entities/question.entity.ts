import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Intelligence } from './intelligence.entity';
import { Option } from './option.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string; // e.g., "I like solving puzzles"

  @ManyToOne(() => Intelligence, (intelligence) => intelligence.questions)
  intelligence: Intelligence;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}
