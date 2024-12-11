import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly authRepository: Repository<Users>
    ){}


    async validateUser(email: string, password: string){
        const user = await this.authRepository.findOne({where: {email}})
        if (!user){
            return null;
        };
        //validate user password
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch){
            return null;
        };
        return user;
    };

    async signUp(email: string, password: string){
        const foundUser = await this.authRepository.findOne({where: {email}})
        if (foundUser) {
            throw new BadRequestException("email already in use");
        };
        const hashPassword = await hash(password, 10);
        
        const user = this.authRepository.create({
            email,
            password: hashPassword
        });
        const newUser = await this.authRepository.save(user)

        return newUser
    };
}
