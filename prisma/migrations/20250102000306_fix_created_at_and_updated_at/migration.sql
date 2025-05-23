-- AlterTable
ALTER TABLE "account_tokens" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "created_at" DROP NOT NULL;
