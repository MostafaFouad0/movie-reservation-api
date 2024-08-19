/*
  Warnings:

  - The primary key for the `showtime_details` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "showtime_details" DROP CONSTRAINT "showtime_details_pkey",
ALTER COLUMN "showtime_date" SET DATA TYPE TEXT,
ADD CONSTRAINT "showtime_details_pkey" PRIMARY KEY ("showtime_id", "showtime_date");
