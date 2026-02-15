import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    private readonly SALT_ROUNDS = 12;

    private signToken(user: { id: string; email: string; role: string }) {
        return jwt.sign({
            sub: user.id,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
    }

    constructor(private prisma: PrismaService) { }

    async register(registerDto: RegisterDto) {
        const { fullName, email, password } = registerDto

        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            throw new ConflictException("Email in use")
        }

        try {
            const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS)

            const user = await this.prisma.user.create({
                data: {
                    fullName,
                    email,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    password: false,
                    role: true
                }
            });

            const token = this.signToken(user);

            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                },
            };
        } catch (error) {
            console.error('Error during user registration:', error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(
                'An error occurred during registration',
            );
        }
    }

    async login(loginDto: LoginDto) {
        try {

            const { email, password } = loginDto

            const user = await this.prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                throw new NotFoundException("the user not found")
            }

            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                throw new BadRequestException("the password and email is incorect")
            }

            const token = this.signToken(user)

            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role
                }
            }

        } catch (error) {
            console.error('Error during user registration:', error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(
                'An error occurred during registration',
            );
        }
    }
}
