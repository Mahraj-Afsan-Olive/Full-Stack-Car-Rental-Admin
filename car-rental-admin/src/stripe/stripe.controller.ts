import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: { amount: number }) {
    const { amount } = body;
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount');
    }

    return this.stripeService.createCheckoutSession(amount);
  }
}
