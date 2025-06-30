import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rental } from './rental.entity';


@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('decimal')
  daily_rate: number;

  @OneToMany(() => Rental, (rental) => rental.car)
  rentals: Rental[];
}
