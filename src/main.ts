import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Walking Rabbit API')
    .setDescription('The Walking Rabbit API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // end - swagger

  const PORT = process.env.SERVER_PORT;

  try {
    await app.listen(PORT);
    console.log(`APP IS RUNNING ON PORT ${PORT}`);
    console.log(`docs: http://localhost:${PORT}/docs`);
  } catch (error) {
    console.log(error, '<--- error');
  }
}
bootstrap();
