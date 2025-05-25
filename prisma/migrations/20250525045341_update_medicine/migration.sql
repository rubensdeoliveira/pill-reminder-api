/*
  Warnings:

  - You are about to drop the column `default_frequency` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the column `default_quantity` on the `medicines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "medicines" DROP COLUMN "default_frequency",
DROP COLUMN "default_quantity";
