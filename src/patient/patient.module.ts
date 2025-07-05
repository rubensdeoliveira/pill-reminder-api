import { Module } from '@nestjs/common'

import { SharedModule } from '@/_shared/shared.module'
import { CreatePatientController } from '@/patient/controllers/create-patient.controller'
import { GetPatientController } from '@/patient/controllers/get-patient.controller'
import { CreatePatientUseCase } from '@/patient/use-cases/create-patient.use-case'
import { GetPatientUseCase } from '@/patient/use-cases/get-patient.use-case'

@Module({
  imports: [SharedModule],
  controllers: [CreatePatientController, GetPatientController],
  providers: [CreatePatientUseCase, GetPatientUseCase],
})
export class PatientModule {}
