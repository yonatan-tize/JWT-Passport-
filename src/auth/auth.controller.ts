import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategyAuth } from './guards/local-auth.guard';
import { CreateUserDto } from './dtos/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() user: CreateUserDto){
    const newUser = this.authService.signUp(user.email, user.password)
    return newUser
  }

  @Post('signin')
  @UseGuards(LocalStrategyAuth)
  async signIn(@Request() req){
    return {id: req.user.userId}
  }
}
