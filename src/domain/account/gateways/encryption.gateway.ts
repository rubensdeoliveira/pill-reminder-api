export type ValidateHashParams = {
  value: string
  hashedValue: string
}

export abstract class EncryptionGateway {
  abstract createHash(value: string): Promise<string>
  abstract validateHash({
    value,
    hashedValue,
  }: ValidateHashParams): Promise<boolean>
}
