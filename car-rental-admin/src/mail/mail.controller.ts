import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { CarRentalAdvertisementDto } from './dto/car-rental-advertisement.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-car-rental-advertisement')
  @UseGuards(JwtAuthGuard)
  async sendCarRentalAdvertisement(
    @Body() carRentalDto: CarRentalAdvertisementDto,
  ): Promise<{ message: string }> {
    const { email, carModel, location, description, rentalPricePerDay, imageUrl } = carRentalDto;

    const emailTitle = `Car Rental Offer: ${carModel}`;
    const emailMessage = `
      <h2>Special Car Rental Offer</h2>
      <p><strong>Car Model:</strong> ${carModel}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Rental Price Per Day:</strong> $${rentalPricePerDay}</p>
      ${imageUrl ? `<img src="${imageUrl}" alt="Car Image" />` : ''}
    `;

    await this.mailService.sendMail(email, emailTitle, emailMessage);
    return { message: 'The advertisement mail has been sent.' };
  }
}
