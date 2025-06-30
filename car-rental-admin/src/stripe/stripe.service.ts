import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('stripe secret key', {
    });
  }

  async createCheckoutSession(amount: number): Promise<{ url: string; sessionId: string }> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Car Rental Payment',
            },
            unit_amount: Math.round(amount * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3001/payment-success',
      cancel_url: 'http://localhost:3001/payment-cancel',
    });

    if (!session.url) {
      throw new Error('Failed to create checkout session URL.');
    }

    return { url: session.url, sessionId: session.id };
  }
}
