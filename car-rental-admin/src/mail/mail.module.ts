import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
          user: 'oliveshikder2018@gmail.com',       
          pass: 'phpqgfuxjxtgnuux',       
        },
      },
      defaults: {
        from: '"Car Rental Admin" <oliveshikder2018@gmail.com>', 
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
