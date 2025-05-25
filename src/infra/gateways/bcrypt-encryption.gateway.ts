import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

export type ValidateHashInput = {
  value: string
  hashedValue: string
}

@Injectable()
export class BcryptEncryptionGateway {
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

export { BcryptEncryptionGateway as EncryptionGateway }
