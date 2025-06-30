import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { Staff } from '../payment/entities/staff.entity';
import { Owner } from '../payment/entities/owner.entity';
import { v4 as uuidv4 } from 'uuid';
import { Twilio } from 'twilio';

@Injectable()
export class PaymentService {
  private otpStore = new Map<string, string>(); // Temporary store for OTPs

  // Twilio configuration
  private twilioClient = new Twilio(
    '',  //  Twilio account SID
    ''    //  Twilio Auth token
  );

  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectRepository(Owner) private ownerRepo: Repository<Owner>,
  ) {}

  async initiatePayment(userId: number, userType: 'staff' | 'owner', phoneNo: string, amount: number) {
    const user = userType === 'staff'
      ? await this.staffRepo.findOneBy({ id: userId })
      : await this.ownerRepo.findOneBy({ id: userId });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  
    const payment = this.paymentRepo.create({
      id: uuidv4(),
      userId,
      userType,
      amount,
      phoneNo,
    });
  
    await this.paymentRepo.save(payment);
  
    // Save OTP temporarily mapped to payment ID
    this.otpStore.set(payment.id, otp);
  
    // Send OTP via Twilio
    await this.sendOtpSms(phoneNo, otp);
  
    return {
      message: 'OTP sent successfully to your phone number',
      paymentId: payment.id, 
    };
  }
  

  async confirmPayment(paymentId: string, otp: string) {
    const payment = await this.paymentRepo.findOneBy({ id: paymentId });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const validOtp = this.otpStore.get(paymentId);

    if (!validOtp || validOtp !== otp) {
      payment.status = 'failed';
      await this.paymentRepo.save(payment);
      return { message: 'Payment Failed' };
    }

    payment.status = 'successful';
    await this.paymentRepo.save(payment);

    this.otpStore.delete(paymentId); // Clean up

    return { message: 'Payment Successful' };
  }

  async getPaymentStatus(userId: number, userType: 'staff' | 'owner') {
    let user;

    if (userType === 'staff') {
      user = await this.staffRepo.findOne({ where: { id: userId } });
    } else if (userType === 'owner') {
      user = await this.ownerRepo.findOne({ where: { id: userId } });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payment = await this.paymentRepo.findOne({
      where: { userId: user.id, userType },
      order: { createdAt: 'DESC' },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found for this user');
    }

    return {
      paymentId: payment.id,
      amount: payment.amount,
      status: payment.status,
    };
  }

  // Helper method to send SMS using Twilio
  private async sendOtpSms(phoneNo: string, otp: string) {
    try {
      const message = await this.twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        to: phoneNo,  // User's phone number (including country code)
      });

      console.log(`OTP sent to ${phoneNo}: ${message.sid}`);
    } catch (error) {
      console.error('Error sending SMS via Twilio:', error);
    }
  }
}
