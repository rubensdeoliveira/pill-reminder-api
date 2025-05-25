/*
  Warnings:

  - Added the required column `phone` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "accounts_email_key";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "dob" DATE,
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
