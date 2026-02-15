import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CreateRegistrationDto {
    @IsString()
    @IsNotEmpty()
    eventId: string;
}