import { pickFromEntries } from '@/_shared/helpers/pick-from-entries.helper'
import { DentistOutput } from '@/dentist/dtos/dentist.dto'
import { DentistEntity } from '@/dentist/entities/dentist.entity'

export function toDentistOutput(dentist: DentistEntity): DentistOutput {
  return pickFromEntries(dentist, [
    'id',
    'name',
    'email',
    'phone',
    'dob',
    'role',
  ])
}
