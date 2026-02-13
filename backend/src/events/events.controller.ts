import { CreateEventDto } from './dto/create-event.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventResponseDto } from './dto/event-response.dto';

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Post()
    async create (
        @Body() createEventDto:  CreateEventDto
    ): Promise<EventResponseDto> {
        return await this.eventsService.create(createEventDto)
    }

    @Get()
    async findAll(): Promise<EventResponseDto[]> {
        return await this.eventsService.findAll()
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string
    ) {
        return await this.eventsService.findOne(id)
    }
}
