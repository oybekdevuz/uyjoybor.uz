import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT
  app.enableCors();
  app.setGlobalPrefix("api")
  const config = new DocumentBuilder()
    .setTitle('Milliy')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .build();

  const documet = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe())
  SwaggerModule.setup('/api/docs', app, documet);

  await app.listen(port, () => {
    console.log("Olov olov 🔥🔥🔥🔥", +port);
  });
}
bootstrap();
