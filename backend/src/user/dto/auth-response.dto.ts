import { Role } from "@prisma/client";
import { IsDate, IsEmail, IsString } from "class-validator";


export class AutheResponseDto {
    @IsString()
    id: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    fullName: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @IsString()
    role: Role;
}