import { Body, Controller, Post, Res, HttpCode, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


const isProd = process.env.NODE_ENV === "production";
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { };



  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.register(registerDto);

    res.cookie("access_token", data.token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
      path: '/'
    });

    return { user: data.user };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(loginDto);

    res.cookie("access_token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
      path: '/'
    });

    return { user: data.user };
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: '/',
    });
    return { message: "Logged out" };
  }
}
