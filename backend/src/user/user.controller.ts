import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getProfile() {
        return await this.userService.findOne()
    }

    @Get()
    async findAll() {
        await this.userService.findAll()
    }

    @Get(':id')
    async findOne(@Param() id: string) {
        await this.userService.findOne()
    }

    @Put('me/password')
    async update(@Param('id') id: string) {}

    @Delete('me')
    async remove(@Param('id') id: string) {}
}
