/*
  Warnings:

  - You are about to drop the column `commentsId` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_commentsId_fkey";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "commentsId",
ADD COLUMN     "commentId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
