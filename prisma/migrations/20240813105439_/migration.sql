-- CreateTable
CREATE TABLE "moive" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desciption" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "age_restricted" BOOLEAN NOT NULL,
    "poster" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hall" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "vip_seats_cnt" INTEGER NOT NULL,
    "regular_seats_cnt" INTEGER NOT NULL,

    CONSTRAINT "hall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "showtime" (
    "id" SERIAL NOT NULL,
    "hall_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "showtime_start" TIMESTAMP(3) NOT NULL,
    "showtime_end" TIMESTAMP(3) NOT NULL,
    "vip_seat_price" INTEGER NOT NULL,
    "regular_seat_price" INTEGER NOT NULL,
    "showtime_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "showtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hall_seats" (
    "id" SERIAL NOT NULL,
    "hall_id" INTEGER NOT NULL,
    "seat_type" TEXT NOT NULL,

    CONSTRAINT "hall_seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "showtime_seat" (
    "id" INTEGER NOT NULL,
    "showtime_id" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,

    CONSTRAINT "showtime_seat_pkey" PRIMARY KEY ("id","showtime_id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "showtime_id" INTEGER NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "hall_id" INTEGER NOT NULL,
    "issued_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hall_title_key" ON "hall"("title");

-- AddForeignKey
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "hall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "moive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hall_seats" ADD CONSTRAINT "hall_seats_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "hall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtime_seat" ADD CONSTRAINT "showtime_seat_id_fkey" FOREIGN KEY ("id") REFERENCES "hall_seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtime_seat" ADD CONSTRAINT "showtime_seat_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "showtime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "showtime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "hall_seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "hall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
