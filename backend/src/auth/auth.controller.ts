import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


const isProd = process.env.NODE_ENV === "production";
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { };



  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.register(registerDto);

    res.cookie("access_token", data.token, {
      httpOnly: true,
      secure: isProd,      // ⭐ KEY FIX
      sameSite: isProd ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user: data.user };
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(loginDto);

    res.cookie("access_token", data.token, {
      httpOnly: true,
      secure: isProd,      // ⭐ KEY FIX
      sameSite: isProd ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user: data.user };
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token");
    return { message: "Logged out" };
  }
}
