import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

import {
  EncryptionGateway,
  ValidateHashParams,
} from '@/domain/account/gateways/encryption.gateway'

@Injectable()
export class BcryptEncryptionGateway implements EncryptionGateway {
  constructor() {}

  async createHash(value: string): Promise<string> {
    const hashedValue = await hash(value, 8)
    return hashedValue
  }

  async validateHash({
    value,
    hashedValue,
  }: ValidateHashParams): Promise<boolean> {
    const isValid = await compare(value, hashedValue)
    return isValid
  }
}
