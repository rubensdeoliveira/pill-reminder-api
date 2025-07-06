import { PatientOutput } from '@/patient/dtos/patient.dto'
import { PatientEntity } from '@/patient/entities/patient.entity'

export type CreatePatientUseCaseInput = Pick<PatientEntity, 'name'> & {
  phone: string
  dob: Date
}

export type CreatePatientUseCaseOutput = PatientOutput
