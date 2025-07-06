import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

import {
  CreateHashInput,
  CreateHashOutput,
  EncryptionGateway,
  ValidateHashInput,
  ValidateHashOutput,
} from '@/_shared/gateways/encryption.gateway'

@Injectable()
export class EncryptionBcryptGateway implements EncryptionGateway {
  constructor() {}

  async createHash({ value }: CreateHashInput): Promise<CreateHashOutput> {
    const hashedValue = await hash(value, 8)
    return hashedValue
  }

  async validateHash({
    value,
    hashedValue,
  }: ValidateHashInput): Promise<ValidateHashOutput> {
    const isValid = await compare(value, hashedValue)
    return isValid
  }
}
