import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class KeepAliveService {
  private readonly logger = new Logger(KeepAliveService.name);

  constructor(private readonly httpService: HttpService) {}

  @Cron('0 */13 * * * *')
  async keepAlive() {
    try {
      await this.httpService.axiosRef.get(`${process.env.APP_URL}`);
      this.logger.log('Keep-alive ping sent successfully');
    } catch (error) {
      this.logger.error('Keep-alive ping failed', error.message);
    }
  }
}