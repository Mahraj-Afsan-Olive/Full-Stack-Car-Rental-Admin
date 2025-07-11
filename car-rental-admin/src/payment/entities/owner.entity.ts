import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ name: 'phoneNo' }) 
  phoneNo: string;

  @Column()
  email: string;
}
