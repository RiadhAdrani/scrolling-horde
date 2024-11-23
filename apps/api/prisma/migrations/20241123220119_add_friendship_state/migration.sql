/*
  Warnings:

  - Added the required column `state` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "state" "InvitationStatus" NOT NULL;
