import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true
  })
  
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

      // exceptionFactory: (errors) => {
      //   return new BadRequestException("All fields are required");
      // },
    })
  )

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
