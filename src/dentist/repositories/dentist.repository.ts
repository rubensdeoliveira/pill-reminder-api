import { DentistEntity } from '@/dentist/entities/dentist.entity'

export abstract class DentistRepository {
  abstract create(
    data: CreateDentistRepositoryInput,
  ): Promise<CreateDentistRepositoryOutput>

  abstract findByEmail(
    data: FindByEmailDentistRepositoryInput,
  ): Promise<FindByEmailDentistRepositoryOutput>

  abstract findById(
    data: FindByIdDentistRepositoryInput,
  ): Promise<FindByIdDentistRepositoryOutput>
}

export type CreateDentistRepositoryInput = {
  email: string
  name: string
  phone: string | null
  dob: Date | null
  password: string | null
}

type DentistEntityWithPassword = DentistEntity & {
  password: string | null
}

export type CreateDentistRepositoryOutput = DentistEntity

export type FindByEmailDentistRepositoryInput = {
  email: string
}

export type FindByEmailDentistRepositoryOutput =
  DentistEntityWithPassword | null

export type FindByIdDentistRepositoryInput = {
  id: string
}

export type FindByIdDentistRepositoryOutput = DentistEntity | null
