import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { AiServiceController } from './ai-service/ai-service.controller';
import { map, Observable } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'ai_service',
      protoPath: './ai_service/ai_service.proto',
    },
  })
  private readonly client: ClientGrpc;
  private aiService: AiServiceController;

  onModuleInit() {
    this.aiService = this.client.getService<AiServiceController>('AiService');
  }

  askFortune(prompt: string): Observable<string> {
    return this.aiService
      .generateFortune({ prompt })
      .pipe(map((res) => res.response));
  }
}
