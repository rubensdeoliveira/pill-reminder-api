/*
  Warnings:

  - You are about to drop the column `name` on the `medicines` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[active_ingredient]` on the table `medicines` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `active_ingredient` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `administration_route` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dosage` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pharmaceutical_form` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posology` to the `medicines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account_tokens" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "medicines" DROP COLUMN "name",
ADD COLUMN     "active_ingredient" TEXT NOT NULL,
ADD COLUMN     "administration_route" TEXT NOT NULL,
ADD COLUMN     "dosage" TEXT NOT NULL,
ADD COLUMN     "pharmaceutical_form" TEXT NOT NULL,
ADD COLUMN     "posology" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "medicines_active_ingredient_key" ON "medicines"("active_ingredient");
