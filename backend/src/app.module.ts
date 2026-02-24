import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { ScheduleModule } from '@nestjs/schedule';
import { KeepAliveModule } from './keep-alive/keep-alive.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    ScheduleModule.forRoot(),
    PrismaModule, 
    AuthModule, 
    UserModule, 
    EventsModule, 
    RegistrationsModule,
    KeepAliveModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
