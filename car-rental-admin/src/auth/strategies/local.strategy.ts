import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local'
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authservice: AuthService){
    super();  
  }
async validate(username: string, password: string): Promise<any> {
  const result = await this.authservice.validateUser({ username, password });
  if (!result) {
    throw new UnauthorizedException();
  }
  return result; // return { user, token }
}

}