import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: "johndoe@gmail.com", description: "Admin's email address"})
    @IsString()
    @IsEmail()
    email?: string;

    @ApiProperty({example: "Uzbek!$t0n", description: "Admin's password it will be Strong password"})
    @IsNotEmpty()
    password: string;
}