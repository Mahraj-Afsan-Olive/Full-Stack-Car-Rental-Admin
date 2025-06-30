import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    private userService: UserService,
  ) {}

async validateUser({ username, password }: AuthPayloadDto) {
  const user = await this.userService.findByUsername(username);
  if (!user) throw new UnauthorizedException('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

  const { password: _, ...userWithoutPassword } = user;
  const token = this.jwtservice.sign(userWithoutPassword);

  return { user: userWithoutPassword, token }; // return both
}


  
}
