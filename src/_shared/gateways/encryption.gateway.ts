export abstract class EncryptionGateway {
  abstract createHash(input: CreateHashInput): Promise<CreateHashOutput>
  abstract validateHash(input: ValidateHashInput): Promise<ValidateHashOutput>
}

export type CreateHashInput = {
  value: string
}

export type CreateHashOutput = string

export type ValidateHashInput = {
  value: string
  hashedValue: string
}

export type ValidateHashOutput = boolean
