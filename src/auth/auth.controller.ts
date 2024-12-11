import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategyAuth } from './guards/local-auth.guard';
import { CreateUserDto } from './dtos/users.dto';
import { get } from 'http';
import { JwtStrategyGuard } from './guards/jwt-strategy.guard';

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
  signIn(@Request() req){
    return {
      id: req.user.userId,
      accessToken: req.user.accessToken
    }
  }

  @Get('protected')
//   @UseGuards(LocalStrategyAuth)
  @UseGuards(JwtStrategyGuard)
  book(@Request() req){
    return { user: req.user }
  }

}
