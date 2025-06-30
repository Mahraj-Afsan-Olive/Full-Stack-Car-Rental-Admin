import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @Column()
  userType: 'staff' | 'owner';

  @Column('decimal')
  amount: number;

  @Column()
  phoneNo: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'successful' | 'failed';

  @CreateDateColumn()
  createdAt: Date;
}
