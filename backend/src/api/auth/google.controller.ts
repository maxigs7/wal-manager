import { AllowAnonymous } from '@core/decorators';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/google')
@AllowAnonymous()
export class GoogleController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async signIn(@Req() req) {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async signInCallback(@Req() req) {
    return req.user;
  }
}
