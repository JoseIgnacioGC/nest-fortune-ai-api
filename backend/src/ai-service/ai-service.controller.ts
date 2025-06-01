import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AiServiceService } from './ai-service.service';
import { Observable } from 'rxjs';

@Controller()
export class AiServiceController {
  constructor(private readonly aiServiceService: AiServiceService) {}

  @GrpcMethod('AiService')
  generateFortune(data: { prompt: string }): Observable<{ response: string }> {
    return this.aiServiceService.generateFortune(data.prompt);
  }
}
