import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

import {
  EncryptionGateway,
  ValidateHashInput,
} from '@/_shared/gateways/encryption.gateway'

@Injectable()
export class EncryptionBcryptGateway implements EncryptionGateway {
  constructor() {}

  async createHash(value: string): Promise<string> {
    const hashedValue = await hash(value, 8)
    return hashedValue
  }

  async validateHash({
    value,
    hashedValue,
  }: ValidateHashInput): Promise<boolean> {
    const isValid = await compare(value, hashedValue)
    return isValid
  }
}
