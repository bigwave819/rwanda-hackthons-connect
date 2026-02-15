import { HackerthonStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";


export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    partners: string;

    @IsString()
    @IsNotEmpty()
    prize: string;

    @IsEnum(HackerthonStatus)
    @IsNotEmpty()
    status: HackerthonStatus
}