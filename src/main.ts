import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs Rest Example')
    .setDescription('Nestjs mongodb example endpoints')
    .setVersion('1.0')
    .addTag('Record')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
}
bootstrap();
