-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "username" DROP NOT NULL;
