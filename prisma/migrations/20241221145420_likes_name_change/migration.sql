/*
  Warnings:

  - You are about to drop the column `Num_likes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Num_likes",
ADD COLUMN     "Num_Likes" INTEGER NOT NULL DEFAULT 0;
