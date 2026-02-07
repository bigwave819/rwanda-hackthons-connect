import { AutheResponseDto } from './dto/auth-response.dto';
import { PrismaClient } from '@prisma/client';
import { Injectable, NotFoundException, Delete } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    private readonly SALTROUND = 10;
    constructor(private prisma: PrismaClient) { }

    async findOne(userId: string): Promise<AutheResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                password: false
            }
        })

        if (!user) {
            throw new NotFoundException('the user not found')
        }

        return user
    }

    async findAll(): Promise<AutheResponseDto[]> {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                password: false
            },
            orderBy: { createdAt: 'desc' }
        })
    }

    async update(
        userId: string,
        updateUserDto: UpdateUserDto
    ): Promise<AutheResponseDto> {
        const existingUser = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        if (!existingUser) {
            throw new NotFoundException("User not found")
        }

        if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
            const emailTaken = await this.prisma.user.findUnique({
                where: { email: updateUserDto.email },
            });
            if (emailTaken) {
                throw new NotFoundException('Email is already taken');
            }
        }

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                password: false,
            }
        });

        return updatedUser
    }

    async changePassword(
        userId: string,
        changePasswordDto: ChangePasswordDto
    ): Promise<{ message: string }> {
        const { currentPassword, newPassword } = changePasswordDto

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException("User not found")
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        )

        if (!isPasswordValid) {
            throw new NotFoundException("Current Password is incorrect")
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new NotFoundException(
                'New password must be different from the current password',
            );
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, this.SALTROUND);

        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        return { message: 'Password changed successfully' };

    }

    async remove(userId: string): Promise<{ message: string }>{
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            throw new NotFoundException("the user not found")
        }

        await this.prisma.user.delete({
            where: { id: userId }
        })

        return { message : "User account deleted Successfully" };
    }
}