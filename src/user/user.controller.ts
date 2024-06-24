import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Res, Put, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schema/user.schema';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiTags("User authentication")
  @ApiOperation({summary: "sign up User"})
  @Post("auth/signup")
  signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registeration(createUserDto);
  }
  
  @ApiTags("User authentication")
  @ApiOperation({summary: "sign in User"})
  @Post("auth/signin")
  signInUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.signInUser(loginUserDto)
  }

  @Get("all")
  getAllUsers() {
    return this.userService.getAllUsers()
  }
  
}
