import { CreateEventDto } from './dto/create-event.dto';
import { Body, Controller, Get, Param, Post, Delete, UseGuards, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventResponseDto } from './dto/event-response.dto';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { HackerthonStatus, Role } from '@prisma/client';

@Controller('events')   

export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
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

    @Patch(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    async updateStatus(
        @Param('id') id: string,
        @Body() status: HackerthonStatus
    ) {
        return this.eventsService.updateStatus(id, status)
    }

    @Delete(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    async delete(
        @Param('id') id: string,
    ): Promise<{ message: string }> {
        return await this.eventsService.delete(id)
    }
    
}
