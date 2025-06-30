import { Controller, Post, Body, Get, Req, HttpException, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';



@Controller('auth')
export class AuthController {

    constructor(private authservice: AuthService){}

@Post('login')
@UseGuards(LocalGuard)
login(@Req() req: Request) {
  return req.user; // this now contains { user, token }
}


    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){

        console.log('Inside AuthController status method')
        console.log(req.user);
        return req.user;
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard) 
    logout(@Req() req: Request) {
      
      return { message: 'Successfully logged out.' };
    }


}
