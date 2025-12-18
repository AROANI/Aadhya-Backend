import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Ngo } from './ngo.entity';
import { Assessment } from './assessment.entity';

@Entity()
export class Child extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Ngo, (ngo) => ngo.children)
  ngo: Ngo;

  @OneToMany(() => Assessment, (assessment) => assessment.child)
  assessments: Assessment[];

  @Column()
  yob: number;
}
