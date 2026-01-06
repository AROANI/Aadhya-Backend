import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Child } from './child.entity'; // Make sure you have your existing Child entity
import { Intelligence } from './intelligence.entity';

@Entity()
export class StudentScore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 50 })
  score: number; // Starts at 50, max 100, min 0

  @ManyToOne(() => Child, (child) => child.studentScores) // You need to add this relation to Child entity
  child: Child;

  @ManyToOne(() => Intelligence, (intelligence) => intelligence.scores)
  intelligence: Intelligence;
}
