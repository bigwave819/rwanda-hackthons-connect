import { Controller, Post } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
    constructor(private registrationsService: RegistrationsService) {}

    @Post()
    async create() {}
}
