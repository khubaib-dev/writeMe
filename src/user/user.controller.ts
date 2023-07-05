import { Controller, Get, Res, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common';
import { User } from './entities/user.entity'

import { UserService } from './user.service'
import { MailsService } from '../mails/mails.service';
import { VerificationService } from '../verification/verification.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailsService,
    private readonly verificationService: VerificationService
    ) {}
  
  @Post('sendEmail')
  async sendEmail(@Body() user, @Res() res)
  {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString()

    const to = user.email
    const subject = 'Email Verification'
    const message = `Your verification code is: ${randomCode}`
    user.verify_code = randomCode
    await this.mailService.sendMail(to, subject, message)
    
    this.verificationService.create(randomCode)
    .then(data => {
      return res.status(200).json({
        status: 200,
        code: 'ok',
        data,
      });
    })
    .catch(error => {
      // Handle error
      console.log('Error side')
      return res.status(500).json({
        status: 500,
        code: 'error',
        message: error,
      });
    });
  }

  @Post('verifyEmail')
  async verifyEmail(@Body() user, @Res() res)
  {
    if(await this.verificationService.verifyEmail(user))
    {
      const aMemberUser = await this.userService.createAMemberUser(user)
      user.amember_id = aMemberUser.data[0].login
      this.userService.create(user)
      .then(data => {
        return res.status(200).json({
          status: 200,
          code: 'ok',
          data,
        });
      })
      .catch(error => {
        // Handle error
        console.log('Error side')
        return res.status(500).json({
          status: 500,
          code: 'error',
          message: error,
        });
      });
    }
    else
    {
      return res.status(200).json({
        status: 404,
        code: 'error',
        message: 'Wrong Verification Code',
      });
    }
  }
  


  @Get()
  findAll(@Res() res) {
    this.userService.findAll()
    .then(data => {
      return res.status(200).json({
        status: 200,
        code: 'ok',
        data,
      });
    })
    .catch(error => {
      // Handle error
      return res.status(500).json({
        status: 500,
        code: 'error',
        message: 'An error occurred.',
      });
    });
  }


@Get(':id')
findOne(@Param('id') id: number, @Res() res) {
  return this.userService.findOne(id);
    // .then(data => {
    //   return res.status(200).json({
    //     status: 200,
    //     code: 'ok',
    //     data,
    //   });
    // })
    // .catch(error => {
    //   return res.status(500).json({
    //     status: 500,
    //     code: 'error',
    //     message: 'An error occurred.',
    //   });
    // });
}

  @Patch(':id')
  update(@Param('id') id, @Body() user, @Res() res) {
    this.userService.update(id, user)
    .then(data => {
        return res.status(200).json({
          status: 200,
          code: 'ok',
          data,
        });
      })
      .catch(error => {
        return res.status(500).json({
          status: 500,
          code: 'error',
          message: 'An error occurred.',
        });
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
