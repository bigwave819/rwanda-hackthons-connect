import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //set the global validation pipes in the nestjs app
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
      forbidUnknownValues: true,

      exceptionFactory: (errors) => {
        return new BadRequestException("All fields are required");
      },
    })
  )

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
