import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors : {
      origin: [
        'http://localhost:3001',
        'http://localhost',
        '*',
      ],
      methods: ['GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
      allowedHeaders: [
        'Accept',
        'Content-Type'
      ]
    }
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
