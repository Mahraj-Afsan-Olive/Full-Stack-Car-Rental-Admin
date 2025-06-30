import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { EarningsService } from './earnings.service';
import { Response } from 'express';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('earnings')
export class EarningsController {
  constructor(private readonly earningsService: EarningsService) {}

  @Get('total')
  @UseGuards(JwtAuthGuard)
  async getTotalEarnings() {
    const total = await this.earningsService.getTotalEarnings();
    return { total_earnings: total };
  }

  @Get('top-cars')
  @UseGuards(JwtAuthGuard)
  async getTopEarningCars() {
    const topCars = await this.earningsService.getTopEarningCars();
    return topCars;
  }

  @Get('top-cars/pdf')
  @UseGuards(JwtAuthGuard)
  async generateTopEarningCarsPdf(@Res() res: Response) {
    const pdfPath = await this.earningsService.generateTopEarningCarsPdf();
    return res.sendFile(join(process.cwd(), pdfPath));
  }
}
