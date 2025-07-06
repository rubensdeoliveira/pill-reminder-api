import { pickFromEntries } from '@/_shared/helpers/pick-from-entries.helper'
import { PatientOutput } from '@/patient/dtos/patient.dto'
import { PatientEntity } from '@/patient/entities/patient.entity'

export function toPatientOutput(patient: PatientEntity): PatientOutput {
  return pickFromEntries(patient, [
    'id',
    'name',
    'email',
    'phone',
    'dob',
    'role',
  ])
}
