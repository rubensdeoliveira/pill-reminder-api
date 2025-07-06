import { pickFromEntries } from '@/_shared/helpers/pick-from-entries.helper'
import { MedicineOutput } from '@/medicine/dtos/medicine.dto'
import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export function toMedicineOutput(medicine: MedicineEntity): MedicineOutput {
  return pickFromEntries(medicine, ['id', 'name'])
}
