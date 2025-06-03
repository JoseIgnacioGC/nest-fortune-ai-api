import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const SERVER_PORT: number = Number(process.env.SERVER_PORT ?? 3000);
  const SERVICE_PACKAGE: string = process.env.SERVICE_PACKAGE ?? 'ai_service';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: SERVICE_PACKAGE,
        protoPath: `../shared/grpc/${SERVICE_PACKAGE}.proto`,
      },
    },
    // to use global pipes
    // {
    //   inheritAppConfig: true,
    // },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  console.log(`[Nest] port at: http://localhost:${SERVER_PORT}/`);

  await app.startAllMicroservices();
  await app.listen(SERVER_PORT);
}

void bootstrap();
