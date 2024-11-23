/*
  Warnings:

  - You are about to drop the column `fromId` on the `Followship` table. All the data in the column will be lost.
  - You are about to drop the column `isFriendship` on the `Followship` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Followship` table. All the data in the column will be lost.
  - You are about to drop the column `toId` on the `Followship` table. All the data in the column will be lost.
  - Added the required column `targetId` to the `Followship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Followship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Followship" DROP CONSTRAINT "Followship_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Followship" DROP CONSTRAINT "Followship_toId_fkey";

-- AlterTable
ALTER TABLE "Followship" DROP COLUMN "fromId",
DROP COLUMN "isFriendship",
DROP COLUMN "state",
DROP COLUMN "toId",
ADD COLUMN     "targetId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Followship" ADD CONSTRAINT "Followship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followship" ADD CONSTRAINT "Followship_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
