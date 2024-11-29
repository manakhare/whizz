/*
  Warnings:

  - You are about to drop the column `actionName` on the `AvailableAction` table. All the data in the column will be lost.
  - You are about to drop the column `triggerName` on the `AvailableTrigger` table. All the data in the column will be lost.
  - Added the required column `name` to the `AvailableAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `AvailableTrigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableAction" DROP COLUMN "actionName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AvailableTrigger" DROP COLUMN "triggerName",
ADD COLUMN     "name" TEXT NOT NULL;
