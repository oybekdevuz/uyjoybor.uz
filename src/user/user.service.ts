import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const otpGenerator = require('otp-generator')
import *as bcrypt from 'bcrypt';
import { TokensService } from '../tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<UserDocument>,
    private readonly tokenService: TokensService,
    private readonly jwtService: JwtService,
    ) { }
    
    /**Register user */
    async registeration(createUserDto: CreateUserDto) {
    const user = await this.userSchema.findOne({ email: createUserDto.email })
    if (user) {
      throw new BadRequestException("user already exists")
    }

    if (createUserDto.password !== createUserDto.access_password) {
      throw new BadRequestException("Passwords is not valid")
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7)
    const newUser = await this.userSchema.create({
      ...createUserDto,
      password: hashed_password
    });
    const { token } = await this.tokenService.getToken(newUser);


    const response = {
      newUser,
      token,
    }
    return response
  }


  //**login user email, password */
  async signInUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    
    const user = await this.userSchema.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('email, yoki parol xato')
    }
    const isMatchPass = await bcrypt.compare(password, user.password)
    if (!isMatchPass) {
      throw new UnauthorizedException('email, yoki parol xato')
    }

    const { token } = await this.tokenService.getToken(user);

    const response = {
      user,
      token
    }
    return response
  }

  async getAllUsers () {
    return this.userSchema.find()
  }

}
