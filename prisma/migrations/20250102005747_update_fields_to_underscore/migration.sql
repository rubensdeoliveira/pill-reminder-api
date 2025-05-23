/*
  Warnings:

  - You are about to drop the column `accountId` on the `account_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expiresDate` on the `account_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `account_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refresh_token]` on the table `account_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `account_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_date` to the `account_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `account_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account_tokens" DROP CONSTRAINT "account_tokens_accountId_fkey";

-- DropIndex
DROP INDEX "account_tokens_refreshToken_key";

-- AlterTable
ALTER TABLE "account_tokens" DROP COLUMN "accountId",
DROP COLUMN "expiresDate",
DROP COLUMN "refreshToken",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "expires_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_tokens_refresh_token_key" ON "account_tokens"("refresh_token");

-- AddForeignKey
ALTER TABLE "account_tokens" ADD CONSTRAINT "account_tokens_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
