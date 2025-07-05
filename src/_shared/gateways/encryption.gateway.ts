export type ValidateHashInput = {
  value: string
  hashedValue: string
}

export abstract class EncryptionGateway {
  abstract createHash(value: string): Promise<string>
  abstract validateHash({
    value,
    hashedValue,
  }: ValidateHashInput): Promise<boolean>
}
