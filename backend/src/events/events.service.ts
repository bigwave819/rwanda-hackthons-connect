import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { HackerthonStatus } from '@prisma/client';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async create(createEventDto: CreateEventDto): Promise<EventResponseDto> {

        const createdEvent = await this.prisma.event.create({
            data: {
                title: createEventDto.title,
                thumbnail: createEventDto.thumbnail,
                date: createEventDto.date,
                description: createEventDto.description,
                partners: createEventDto.partners,
                status: createEventDto.status,
                prize: createEventDto.prize
            },
        });

        const eventResponse: EventResponseDto = {
            id: createdEvent.id,
            title: createdEvent.title,
            thumbnail: createdEvent.thumbnail,
            date: createdEvent.date,
            description: createdEvent.description,
            partners: createdEvent.partners,
            status: createdEvent.status,
            prize: createdEvent.prize,
        };

        return eventResponse;
    }

    async findAll(): Promise<EventResponseDto[]> {
        try {
            const events = await this.prisma.event.findMany();

            if (events.length === 0) {
                throw new NotFoundException("No events available")
            }


            return events as EventResponseDto[];
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("Internal server error")
        }
    }

    async findOne(eventId: string): Promise<EventResponseDto> {
        try {
            const event = await this.prisma.event.findUnique({
                where: { id: eventId }
            })

            if (!event) {
                throw new NotFoundException("The event not found")
            }

            return event as EventResponseDto
        } catch (error) {
            console.error();
            throw new InternalServerErrorException("Internal Server Error")
        }
    }

    async delete(eventId: string): Promise<{ message: string }> {
        try {
            const event = await this.prisma.event.findUnique({
                where: { id: eventId }
            })

            if (!event) {
                throw new NotFoundException("the event not found")
            }

            await this.prisma.event.delete({
                where: { id: eventId }
            })

            return { message: "Event deleted Successfully" };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("Internal Server Error")
        }
    }

    async updateStatus(
        eventId: string,
        status: HackerthonStatus
    ): Promise<{ message: string }> {
        try {
            const event = await this.prisma.event.findUnique({
                where: { id: eventId }
            })

            if (!event) {
                throw new NotFoundException("The event Not found")
            }
            await this.prisma.event.update({
                where: { id: eventId },
                data: {
                    status: status
                }
            })
            return { message: "The status updated successfully" };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("Internal Server Error")
        }
    }
}
