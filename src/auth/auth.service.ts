import { Injectable, Inject } from '@nestjs/common'
import axios, {AxiosRequestConfig} from 'axios'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  
  constructor(
    private jwtService: JwtService,
    private userService: UserService
    ) {}
    
    
    async login(body)
    {
      const user = await this.userService.findByEmail(body.email);
      if (user) {
        await this.verifyPassword(body.password, user.password);
        delete user.password;
        return {
          user,
          token: await this.jwtService.sign({
            email: user.email,
            id: user.id,
          })
        };
      } else {
        return 'User not exist'
      }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      return 'Wrong Credentials'
    }
  }


}
