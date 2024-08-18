-- AlterTable
CREATE SEQUENCE hall_seats_id_seq;
ALTER TABLE "hall_seats" ALTER COLUMN "id" SET DEFAULT nextval('hall_seats_id_seq');
ALTER SEQUENCE hall_seats_id_seq OWNED BY "hall_seats"."id";
