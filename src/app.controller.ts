import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    var data = 'initial';
    console.log(data)
    data =  this.appService.getHello();
    console.log(data)
  }
}
