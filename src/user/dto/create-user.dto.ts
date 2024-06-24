import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({example: "example@gmail.com", description: "user's email"})
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({example: "12345678", description: "Password must be strong"})
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: "12345678", description: "Password must be strong"})
    @IsNotEmpty()
    access_password: string;
}
