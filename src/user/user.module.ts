import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailsService } from '../mails/mails.service';
import { VerificationService } from  '../verification/verification.service'
import { Verification } from '../verification/entities/verification.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Verification])
  ],
  controllers: [UserController],
  providers: [UserService,MailsService,VerificationService]
})
export class UserModule {}
