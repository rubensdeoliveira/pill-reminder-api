-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PATIENT', 'DENTIST');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PATIENT';
