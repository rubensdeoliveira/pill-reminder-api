import { Module } from '@nestjs/common'

import { SharedModule } from '@/_shared/shared.module'
import { CreateMedicineController } from '@/medicine/controllers/create-medicine.controller'
import { MedicinePrismaRepository } from '@/medicine/repositories/implementations/medicine-prisma.repository'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'
import { CreateMedicineUseCase } from '@/medicine/use-cases/create-medicine.use-case'

@Module({
  imports: [SharedModule],
  controllers: [CreateMedicineController],
  providers: [
    CreateMedicineUseCase,
    {
      provide: MedicineRepository,
      useClass: MedicinePrismaRepository,
    },
  ],
  exports: [MedicineRepository],
})
export class MedicineModule {}
