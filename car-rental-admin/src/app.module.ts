import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { PaymentModule } from './payment/payment.module';
import { Staff } from './payment/entities/staff.entity';
import { Owner } from './payment/entities/owner.entity';
import { Payment } from './payment/entities/payment.entity';
import { MailModule } from './mail/mail.module';
import { Car } from './earnings/entities/car.entity';
import { Rental } from './earnings/entities/rental.entity';
import { EarningsModule } from './earnings/earnings.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'Car-Rental',
      entities: [User, Staff, Owner, Payment, Car, Rental],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PaymentModule,
    MailModule,
    EarningsModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
