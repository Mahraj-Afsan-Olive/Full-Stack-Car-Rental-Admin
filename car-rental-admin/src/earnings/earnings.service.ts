import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { Rental } from './entities/rental.entity';
import * as PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';

@Injectable()
export class EarningsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
  ) {}

  async getTotalEarnings(): Promise<number> {
    const { sum } = await this.rentalRepository
      .createQueryBuilder('rental')
      .select('SUM(rental.total_amount)', 'sum')
      .getRawOne();
    return Number(sum) || 0;
  }

  async getTopEarningCars(limit = 5) {
    const results = await this.rentalRepository
      .createQueryBuilder('rental')
      .select('rental.car_id', 'car_id')
      .addSelect('SUM(rental.total_amount)', 'total_earnings')
      .groupBy('rental.car_id')
      .orderBy('total_earnings', 'DESC')
      .limit(limit)
      .getRawMany();
  
    const cars: { name: string; location: string; total_earnings: number }[] = [];
  
    for (const result of results) {
      const car = await this.carRepository.findOne({ where: { id: result.car_id } });
      if (car) {
        cars.push({
          name: car.name,
          location: car.location,
          total_earnings: Number(result.total_earnings),
        });
      }
    }
  
    return cars;
  }
  
  async generateTopEarningCarsPdf(): Promise<string> {
    const topCars = await this.getTopEarningCars(5);
    if (topCars.length === 0) throw new Error('No rentals found.');

    const doc = new PDFDocument();
    const filePath = `./top-earning-cars.pdf`;
    const writeStream = createWriteStream(filePath);

    doc.pipe(writeStream);

    doc.fontSize(25).text('Top 5 Earning Cars Report', { align: 'center' });
    doc.moveDown();

    topCars.forEach((car, index) => {
      doc.fontSize(18).text(`Rank ${index + 1}`);
      doc.fontSize(14).text(`Car Name: ${car.name}`);
      doc.text(`Location: ${car.location}`);
      doc.text(`Total Earnings: $${car.total_earnings}`);
      doc.moveDown();
    });

    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', (err) => reject(err));
    });
  }
}
