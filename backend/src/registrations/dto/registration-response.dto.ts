import { IsDate, IsNotEmpty, IsUUID } from "class-validator";



export class RegistrationsResponseDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    eventId: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string

    @IsDate()
    createdAt: Date;
}