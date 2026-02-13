import { HackerthonStatus } from "@prisma/client";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class EventResponseDto {
    @IsString()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    @IsDate()
    @IsNotEmpty()
    date: Date

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    partners: string;

    @IsString()
    @IsNotEmpty()
    status: HackerthonStatus

    @IsString()
    @IsNotEmpty()
    prize: string;
}