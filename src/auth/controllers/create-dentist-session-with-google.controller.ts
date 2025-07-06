import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import { CookiesGateway } from '@/_shared/gateways/cookies.gateway'
import { EnvGateway } from '@/_shared/gateways/env.gateway'
import { GoogleGuard } from '@/auth/guards/google.guard'

@Controller(routes.auth)
export class CreateDentistSessionWithGoogleController {
  constructor(
    private config: EnvGateway,
    private cookies: CookiesGateway,
  ) {}

  @Get('/dentist/google')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('/dentist/google')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    const { refreshToken, accessToken } = req.user

    const cookiesOptions = this.cookies.get('COOKIE_OPTIONS')

    res.cookie(this.cookies.get('REFRESH_TOKEN'), refreshToken, cookiesOptions)
    res.cookie(this.cookies.get('ACCESS_TOKEN'), accessToken, cookiesOptions)

    const redirectUrl = this.config.get('FRONTEND_URL')
    return res.redirect(302, redirectUrl)
  }
}
