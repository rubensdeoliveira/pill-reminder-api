import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  CreateSessionWithGoogleMobileBodySchema,
  createSessionWithGoogleMobileValidator,
} from '@/application/account/validators/create-session-with-google-mobile.validator'
import { GoogleGuard } from '@/application/shared/guards/google.guard'
import { CookiesGateway } from '@/domain/account/gateways/cookies.gateway'
import { EnvGateway } from '@/domain/account/gateways/env.gateway'
import { CreateSessionWithGoogleMobileUseCase } from '@/domain/account/use-cases/create-session-with-google-mobile.use-case'

@Controller('/session')
export class CreateSessionWithGoogleController {
  constructor(
    private createSessionWithGoogleMobileUseCase: CreateSessionWithGoogleMobileUseCase,
    private config: EnvGateway,
    private cookies: CookiesGateway,
  ) {}

  @Get('/google')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    const { refreshToken, accessToken } = req.user

    const cookiesOptions = this.cookies.get('COOKIE_OPTIONS')

    res.cookie(this.cookies.get('REFRESH_TOKEN'), refreshToken, cookiesOptions)
    res.cookie(this.cookies.get('ACCESS_TOKEN'), accessToken, cookiesOptions)

    const redirectUrl = this.config.get('WEB_APP_URL')
    return res.redirect(302, redirectUrl)
  }

  @Get('/google/mobile')
  async googleAuthMobile(
    @Body(createSessionWithGoogleMobileValidator)
    data: CreateSessionWithGoogleMobileBodySchema,
  ) {
    const session =
      await this.createSessionWithGoogleMobileUseCase.execute(data)
    return session
  }
}
