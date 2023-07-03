import { Module } from '@nestjs/common'
import { VerificationService } from './verification.service'
import { VerificationController } from './verification.controller'
import { Verification } from './entities/verification.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Verification])],
  controllers: [VerificationController],
  providers: [VerificationService]
})
export class VerificationModule {}
