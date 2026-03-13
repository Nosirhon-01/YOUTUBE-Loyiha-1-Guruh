import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.setGlobalPrefix("api/v1")

  const config = new DocumentBuilder()
  .setTitle("youtube_guruh1")
  .addBearerAuth()
  .build()
  
  const documentFactory = () => SwaggerModule.createDocument(app as any, config)
  SwaggerModule.setup("swagger", app as any, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    }
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
