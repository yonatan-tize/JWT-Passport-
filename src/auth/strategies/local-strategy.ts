import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ){
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string){
        const user = await this.authService.validateUser(email, password)
        if (!user){
            throw new UnauthorizedException('invalid credentials')
        };
        const payload = { sub: user.id, email: user.email}
        const accessToken = await this.jwtService.signAsync(payload)
        return {
            userId: user.id,
            accessToken
        } 
    }
}