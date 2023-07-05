import { Controller, Get, Res, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user, @Res() res) {
    this.authService.login(user)
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
        message: `An error occurred. ${error}`
      });
    });
  }

}
