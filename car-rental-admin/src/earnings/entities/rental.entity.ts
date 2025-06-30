import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  car_id: number;

  @ManyToOne(() => Car, (car) => car.rentals)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column('decimal')
  total_amount: number;
}
