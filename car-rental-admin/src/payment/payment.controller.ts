import { Controller, Post, Body, Param, ParseIntPipe, Get, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  @UseGuards(JwtAuthGuard)
  async initiate(@Body() body: { userId: number; userType: 'staff' | 'owner'; phoneNo: string; amount: number }) {
    return this.paymentService.initiatePayment(body.userId, body.userType, body.phoneNo, body.amount);
  }

  @Post('confirm')
  @UseGuards(JwtAuthGuard)
  async confirm(@Body() body: { paymentId: string; otp: string }) {
    return this.paymentService.confirmPayment(body.paymentId, body.otp);  
  }
  
  @Get(':userType/:userId')
  @UseGuards(JwtAuthGuard)
  async getPaymentStatus(
    @Param('userId', ParseIntPipe) userId: number, 
    @Param('userType') userType: 'staff' | 'owner', ) 
  {
    return this.paymentService.getPaymentStatus(userId, userType);
  }
}
