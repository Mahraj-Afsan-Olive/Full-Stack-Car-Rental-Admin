import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { Staff } from './entities/staff.entity';
import { Owner } from './entities/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Staff, Owner]),  // Register repositories
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
