import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('registrations')
@UseGuards(JwtGuard, RolesGuard)
export class RegistrationsController {
    constructor(private registrationsService: RegistrationsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Req() req: { user: { id: string; role: string; email: string } },
        @Body() createRegistrationDto: CreateRegistrationDto
    ) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException('User not authenticated');
        }

        const userId = req.user.id
        return await this.registrationsService.create(userId, createRegistrationDto)
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    async findMe(
        @Req() req: { user: { id: string; role: string; email: string } }
    ) {
        const userId = req.user.id
        if (!userId) throw new UnauthorizedException('User not authenticated');
        return this.registrationsService.findMe(userId)
    }

    @Delete(':id')
    async delete(
        @Req() req: { user: { id: string; role: string; email: string } },
        @Param('id') registrationId: string
    ) {
        const userId = req.user.id
        return this.registrationsService.delete(userId, registrationId)
    }

    @Get('event/:eventId')
    @Roles(Role.ADMIN)
    async getEventRegistration(
        @Param('eventId') eventId: string
    ) {
        return this.registrationsService.getEventRegistrations(eventId)
    }
}
