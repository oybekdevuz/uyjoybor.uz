import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsDateString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({example: "Najimov", description: "user's firstname"})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    firstName?: string;

    @ApiProperty({example: "Najim", description: "user's last name"})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastName?: string;
    
    @ApiProperty({example: "+998931234567", description: "user's phone number"})
    @IsOptional()
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone?: string;
    
    @ApiProperty({example: "najim777@gmail.com", description: "user's email address"})
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @ApiProperty({example: "13-12-2023", description: "user's date of birth"})
    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    dateBirth?: Date;
}
