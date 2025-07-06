import { Module } from '@nestjs/common'

import { SharedModule } from '@/_shared/shared.module'
import { CreateMedicineController } from '@/medicine/controllers/create-medicine.controller'
import { DeleteMedicineController } from '@/medicine/controllers/delete-medicine.controller'
import { GetMedicineController } from '@/medicine/controllers/get-medicine.controller'
import { ListMedicineController } from '@/medicine/controllers/list-medicine.controller'
import { UpdateMedicineController } from '@/medicine/controllers/update-medicine.controller'
import { MedicinePrismaRepository } from '@/medicine/repositories/implementations/medicine-prisma.repository'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'
import { CreateMedicineUseCase } from '@/medicine/use-cases/create-medicine.use-case'
import { DeleteMedicineUseCase } from '@/medicine/use-cases/delete-medicine.use-case'
import { GetMedicineUseCase } from '@/medicine/use-cases/get-medicine.use-case'
import { ListMedicineUseCase } from '@/medicine/use-cases/list-medicine.use-case'
import { UpdateMedicineUseCase } from '@/medicine/use-cases/update-medicine.use-case'

@Module({
  imports: [SharedModule],
  controllers: [
    CreateMedicineController,
    DeleteMedicineController,
    GetMedicineController,
    ListMedicineController,
    UpdateMedicineController,
  ],
  providers: [
    CreateMedicineUseCase,
    DeleteMedicineUseCase,
    GetMedicineUseCase,
    ListMedicineUseCase,
    UpdateMedicineUseCase,
    {
      provide: MedicineRepository,
      useClass: MedicinePrismaRepository,
    },
  ],
  exports: [MedicineRepository],
})
export class MedicineModule {}
