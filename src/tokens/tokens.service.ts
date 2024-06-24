import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {

    constructor(private readonly jwtService: JwtService) {}

    async getToken(user: any) {
        const jwtPayload = {
            id: user.id,
            email: user.email,
        };

        const token = await this.jwtService.signAsync(jwtPayload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: process.env.ACCESS_TOKEN_TIME
        });

        return {
            token
        };
    }
}
