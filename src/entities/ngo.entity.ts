import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Child } from './child.entity';

@Entity({ name: 'ngos' }) // This will be the table name in the database
export class Ngo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @OneToMany(() => Child, (child) => child.ngo)
  children: Child[];

  @Column({ unique: true }) // No two NGOs can have the same email
  email: string;

  @Column({ nullable: true }) // This field can be empty
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;
}
