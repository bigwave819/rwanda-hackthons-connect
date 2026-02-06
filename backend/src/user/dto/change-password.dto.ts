import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty({ message: 'New password must not be empty' })
    currentPassword: string;

    @IsString()
    @IsNotEmpty({ message: 'New password must not be empty' })
    @MinLength(6, { message: 'New password must be atleast 6 characters' })
    newPassword: string
}