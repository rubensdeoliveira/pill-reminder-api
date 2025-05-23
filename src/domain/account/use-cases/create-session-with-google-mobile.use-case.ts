import { Injectable, UnauthorizedException } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'

import { EnvGateway } from '@/domain/account/gateways/env.gateway'
import { AccountModel } from '@/domain/account/models/account.model'

type CreateSessionWithGoogleMobileUseCaseRequest = {
  idToken: string
}

export type CreateSessionWithGoogleMobileUseCaseResponse = {
  account: AccountModel
  accessToken: string
  refreshToken: string
}

@Injectable()
export class CreateSessionWithGoogleMobileUseCase {
  private googleClientId: string
  private googleClient: OAuth2Client
  constructor(private config: EnvGateway) {
    this.googleClientId = this.config.get('GOOGLE_CLIENT_ID')
    this.googleClient = new OAuth2Client(this.googleClientId)
  }

  async execute(
    data: CreateSessionWithGoogleMobileUseCaseRequest,
  ): Promise<CreateSessionWithGoogleMobileUseCaseResponse> {
    const { idToken } = data

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.googleClientId,
      })

      const payload = ticket.getPayload()
      console.log(payload)
      return {
        accessToken: '',
        refreshToken: '',
        account: {
          email: '',
          id: '',
          name: '',
        },
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid Google Token')
    }
  }
}
