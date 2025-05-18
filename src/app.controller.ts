import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('category')
  async createCategory(@Body() body: { name: string }) {
    return this.appService.createCategory(body.name);
  }

  @Post('ask')
  async askFortune(@Body() body: { prompt: string }) {
    return this.appService.askFortune(body.prompt);
  }

  @Get()
  obtener() {
    return [2, 4, 6];
  }
}
