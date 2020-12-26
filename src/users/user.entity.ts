import { IsOptional, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  @Length(4, 12)
  firstName: string;

  @Column()
  @Length(4, 12)
  lastName: string;

  @Column({ default: true })
  @IsOptional()
  isActive?: boolean;
}
