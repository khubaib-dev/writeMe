import { Controller, Get, Res, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User, @Res() res){
    this.userService.createUser(user)
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
