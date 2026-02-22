import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { RegistrationsResponseDto } from './dto/registration-response.dto';

@Injectable()
export class RegistrationsService {
    constructor(private prisma: PrismaService) { }


    async create(
        userId: string,
        createRegistrationDto: CreateRegistrationDto
    ): Promise<RegistrationsResponseDto> {

        if (!userId) {
            throw new BadRequestException("User not Found")
        }
        
        const exist = await this.prisma.registration.findUnique({
            where: {
                userId_eventId: {
                    userId,
                    eventId: createRegistrationDto.eventId,
                },
            },
        });

        if (exist) {
            throw new BadRequestException("You already registered for this event");
        }


        const create = await this.prisma.registration.create({
            data: {
                userId,
                eventId: createRegistrationDto.eventId
            }
        })

        return create as RegistrationsResponseDto
    }

    async findMe(userId: string) {
        try {
            // Fetch registrations and include only the event fields we need
            const registrations = await this.prisma.registration.findMany({
                where: { userId },
                include: {
                    event: {
                        select: {
                            id: true,
                            title: true,
                            date: true,
                            status: true,
                            prize: true,
                        },
                    },
                },
            });

            // Map registrations to only return event objects
            const events = registrations.map(r => r.event);

            return events;
        } catch (error) {
            console.error('Error fetching user events:', error);
            throw new InternalServerErrorException('Failed to fetch your registered events');
        }
    }


    async delete(userId: string, registrationId: string) {
        try {
            const registration = await this.prisma.registration.findUnique({
                where: { id: registrationId },
            });

            if (!registration || registration.userId !== userId) {
                throw new NotFoundException('Registration not found');
            }

            await this.prisma.registration.delete({
                where: { id: registrationId },
            });

            return { message: 'Registration deleted successfully' };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to delete registration');
        }
    }

    async getEventRegistrations(eventId: string): Promise<RegistrationsResponseDto[]> {
        try {
            const registrations = await this.prisma.registration.findMany({
                where: { eventId },
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                        },
                    },
                },
            });

            return registrations;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("Internal Server Error")
        }
    }

}
