/*
  Warnings:

  - You are about to drop the column `hall_id` on the `ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_hall_id_fkey";

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "hall_id";
