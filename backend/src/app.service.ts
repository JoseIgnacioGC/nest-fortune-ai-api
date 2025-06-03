import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

type AiService = {
  generateFortune(data: { prompt: string }): Observable<{ response: string }>;
};

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'ai_service',
      protoPath: '../shared/grpc/ai_service.proto',
      url: 'localhost:3005',
    },
  })
  private readonly client: ClientGrpc;
  private aiService: AiService;

  onModuleInit() {
    this.aiService = this.client.getService<AiService>('AiService');
  }

  askFortune(prompt: string): Observable<string> {
    return this.aiService
      .generateFortune({ prompt })
      .pipe(map((res) => res.response));
  }
}
