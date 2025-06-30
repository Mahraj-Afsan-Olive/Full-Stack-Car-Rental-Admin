import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarningsService } from './earnings.service';
import { EarningsController } from './earnings.controller';
import { Car } from './entities/car.entity';
import { Rental } from './entities/rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Rental])],
  controllers: [EarningsController],
  providers: [EarningsService],
})
export class EarningsModule {}
