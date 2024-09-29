import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints ?? {}).join(', '),
          })),
        );
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('ANTARES API')
    .setDescription(
      'Assessment Network for Technical Aptitude and Resource Evaluation System',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('assessments', 'Evaluaciones')
    .addTag('human-resources', 'Recursos humanos')
    .addTag('knowledge-gaps', 'Brechas de conocimiento')
    .addTag('projects-management', 'Manejo de proyectos')
    .addTag('security', 'Seguridad del sistema')
    .addTag('technologies', 'Tecnologías')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(3000);
  console.log('Listening on port 3000 🚀');
}
bootstrap();
