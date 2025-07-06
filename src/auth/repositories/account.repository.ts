import { AccountEntity } from '@/auth/entities/account.entity'

export abstract class AccountRepository {
  abstract create(
    data: CreateAccountRepositoryInput,
  ): Promise<CreateAccountRepositoryOutput>

  abstract findByEmail(
    data: FindByEmailAccountRepositoryInput,
  ): Promise<FindByEmailAccountRepositoryOutput>

  abstract findByPhoneAndDob(
    data: FindByPhoneAndDobAccountRepositoryInput,
  ): Promise<FindByPhoneAndDobAccountRepositoryOutput>

  abstract findById(
    data: FindByIdAccountRepositoryInput,
  ): Promise<FindByIdAccountRepositoryOutput>
}

export type CreateAccountRepositoryInput = Omit<AccountEntity, 'id'>

export type CreateAccountRepositoryOutput = AccountEntity

export type FindByEmailAccountRepositoryInput = {
  email: string
}

export type FindByEmailAccountRepositoryOutput = AccountEntity | null

export type FindByPhoneAndDobAccountRepositoryInput = {
  phone: string
  dob: Date
}

export type FindByPhoneAndDobAccountRepositoryOutput = AccountEntity | null

export type FindByIdAccountRepositoryInput = {
  id: string
}

export type FindByIdAccountRepositoryOutput = AccountEntity | null
