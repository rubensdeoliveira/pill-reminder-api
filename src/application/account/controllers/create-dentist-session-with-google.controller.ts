import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import { Routes } from '@/application/shared/constants/routes'
import { GoogleGuard } from '@/application/shared/guards/google.guard'
import { CookiesGateway } from '@/infra/gateways/nest-cookies.gateway'
import { EnvGateway } from '@/infra/gateways/nest-env.gateway'

@Controller()
export class CreateDentistSessionWithGoogleController {
  constructor(
    private config: EnvGateway,
    private cookies: CookiesGateway,
  ) {}

  @Get(Routes.SESSION.DENTIST.GOOGLE.CREATE)
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get(Routes.SESSION.DENTIST.GOOGLE.CALLBACK)
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
