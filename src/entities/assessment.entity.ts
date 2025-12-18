import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Child } from './child.entity';

@Entity({ name: 'assessments' })
export class Assessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string;

  @Column()
  respondent: string;

  @Column({ type: 'json' })
  answers: Record<string, any>;

  @ManyToOne(() => Child, (child) => child.assessments)
  child: Child;
}
