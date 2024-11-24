/*
  Warnings:

  - Added the required column `userId` to the `Save` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Save" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
