import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ask')
  async askFortune(@Body() body: { prompt: string }) {
    return this.appService.askFortune(body.prompt);
  }
}
