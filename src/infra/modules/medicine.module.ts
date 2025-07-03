import { Module } from '@nestjs/common'

import { CreateMedicineController } from '@/application/medicine/controllers/create-medicine.controller'
import { CreateMedicineUseCase } from '@/domain/medicine/use-cases/create-medicine.use-case'
import { DatabaseModule } from '@/infra/modules/shared/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateMedicineController],
  providers: [CreateMedicineUseCase],
})
export class MedicineModule {}
