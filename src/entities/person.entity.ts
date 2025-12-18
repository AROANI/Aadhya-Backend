import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class Person extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // This is crucial for the Login/OTP system later
  @Column({ unique: true })
  phone: string;

  @Column({ default: 'volunteer' })
  role: string;
}
