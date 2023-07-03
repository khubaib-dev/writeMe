import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailsService } from './mails/mails.service';
import { VerificationModule } from './verification/verification.module';


@Module({
  imports: [ConfigModule.forRoot(),
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
  
  ],
  controllers: [AppController],
  providers: [AppService, MailsService],
})
export class AppModule {}
