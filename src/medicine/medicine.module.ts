import { Module } from '@nestjs/common'

import { SharedModule } from '@/_shared/shared.module'
import { CreateMedicineController } from '@/medicine/controllers/create-medicine.controller'
import { CreateMedicineUseCase } from '@/medicine/use-cases/create-medicine.use-case'

@Module({
  imports: [SharedModule],
  controllers: [CreateMedicineController],
  providers: [CreateMedicineUseCase],
})
export class MedicineModule {}
