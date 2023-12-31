import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants'
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service'
import { User } from '../user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [JwtModule],
})
export class AuthModule {
  constructor() {
    console.log(`My const token is: ${process.env.JWT_SECRET_KEY}`);
  }
}
