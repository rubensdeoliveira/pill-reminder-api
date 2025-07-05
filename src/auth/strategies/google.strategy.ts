import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { z } from 'zod'

import { EnvGateway } from '@/_shared/gateways/env.gateway'
import { CreateDentistSessionWithGoogleUseCaseOutput } from '@/auth/dtos/create-dentist-session-with-google.dto'
import { CreateDentistSessionWithGoogleUseCase } from '@/auth/use-cases/create-dentist-session-with-google.use-case'

const validationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

type GoogleProfile = {
  displayName: string
  emails: { value: string }[]
  photos: { value: string }[]
  name: { familyName: string; givenName: string }
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private createDentistSessionWithGoogleUseCase: CreateDentistSessionWithGoogleUseCase,
    private config: EnvGateway,
  ) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get('GOOGLE_CLIENT_CALLBACK_URL'),
      scope: ['email', 'profile'],
    })
  }

  async validate(
    _: string,
    __: string,
    profile: GoogleProfile,
  ): Promise<Partial<CreateDentistSessionWithGoogleUseCaseOutput>> {
    const data = {
      email: profile.emails[0].value,
      name: profile.displayName,
    }
    const result = validationSchema.safeParse(data)
    if (!result.success) {
      throw new BadRequestException('Invalid profile data from google')
    }
    const session = await this.createDentistSessionWithGoogleUseCase.execute(
      result.data,
    )
    return session
  }
}
