import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ask')
  askFortune(@Body('prompt') prompt: string): Observable<string> {
    return this.appService.askFortune(prompt);
  }
}
