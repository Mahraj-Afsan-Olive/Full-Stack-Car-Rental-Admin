import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { IsString, MinLength, IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column({ unique: true })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  password: string;
}
