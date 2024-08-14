/*
  Warnings:

  - You are about to drop the column `showtime_date` on the `showtime` table. All the data in the column will be lost.
  - You are about to drop the column `showtime_id` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `moive` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `movie_id` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "showtime" DROP CONSTRAINT "showtime_movie_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_showtime_id_fkey";

-- AlterTable
ALTER TABLE "showtime" DROP COLUMN "showtime_date";

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "showtime_id",
ADD COLUMN     "movie_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "moive";

-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desciption" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "age_restricted" BOOLEAN NOT NULL,
    "poster" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "showtime_details" (
    "showtime_id" INTEGER NOT NULL,
    "showtime_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "showtime_details_pkey" PRIMARY KEY ("showtime_id","showtime_date")
);

-- AddForeignKey
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtime_details" ADD CONSTRAINT "showtime_details_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "showtime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
