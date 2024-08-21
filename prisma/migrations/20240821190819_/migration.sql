/*
  Warnings:

  - You are about to drop the column `movie_id` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `showtime_seat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `showtime_date` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showtime_id` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "showtime_seat" DROP CONSTRAINT "showtime_seat_id_fkey";

-- DropForeignKey
ALTER TABLE "showtime_seat" DROP CONSTRAINT "showtime_seat_showtime_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_movie_id_fkey";

-- AlterTable
ALTER TABLE "showtime" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "movie_id",
ADD COLUMN     "showtime_date" TEXT NOT NULL,
ADD COLUMN     "showtime_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "showtime_seat";

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "showtime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
