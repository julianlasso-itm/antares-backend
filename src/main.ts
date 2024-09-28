import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('ANTARES API')
    .setDescription('The API description for ANTARES')
    .setVersion('1.0')
    .addTag('security')
    .addTag('projects-management')
    .addTag('human-resources')
    .addTag('knowledge-gaps')
    .addTag('assessments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(3000);
  console.log('Listening on port 3000 🚀');
}
bootstrap();
