import { AllowAnonymous } from '@core/decorators';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/google')
@AllowAnonymous()
export class GoogleController {
  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line
  async signIn() {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async signInCallback(@Req() req) {
    return req.user;
  }
}
