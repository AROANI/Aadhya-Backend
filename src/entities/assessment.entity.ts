import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { Child } from './child.entity'; // 👈 Import Child

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  // 👇 NEW: This fixes the "Property child does not exist" error
  @ManyToOne(() => Child, (child) => child.assessments, { nullable: true })
  child: Child;

  @OneToMany(() => Question, (question) => question.assessment)
  questions: Question[];
}
