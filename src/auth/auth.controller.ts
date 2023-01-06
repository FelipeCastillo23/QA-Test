import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';

@Controller("api/auth")
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @Post("register")
  async register(@Body() user: RegisterDto) {
    return await this.authService.register(user);
  }
}
