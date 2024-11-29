/*
  Warnings:

  - A unique constraint covering the columns `[zapRunId]` on the table `ZapRunOutbox` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Zap" ADD COLUMN     "zap_name" TEXT NOT NULL DEFAULT 'Untitled';

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_zapRunId_key" ON "ZapRunOutbox"("zapRunId");
