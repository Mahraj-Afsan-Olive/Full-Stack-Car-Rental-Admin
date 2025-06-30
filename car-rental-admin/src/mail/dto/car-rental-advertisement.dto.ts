import { IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class CarRentalAdvertisementDto {
  @IsEmail()
  email: string;

  @IsString()
  carModel: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsNumber()
  rentalPricePerDay: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
