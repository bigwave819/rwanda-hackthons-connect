import { Module } from '@nestjs/common';
import { KeepAliveService } from './keep-alive.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [KeepAliveService]
})
export class KeepAliveModule {}