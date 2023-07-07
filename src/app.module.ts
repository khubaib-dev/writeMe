import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailsService } from './mails/mails.service';
import { VerificationModule } from './verification/verification.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt'
import { User } from './user/entities/user.entity'



@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // set to false in production
    }),
    VerificationModule,
    AuthModule,
  
  ],
  controllers: [AppController,AuthController],
  providers: [UserService, AppService, MailsService, AuthService, JwtService],
})
export class AppModule {}
