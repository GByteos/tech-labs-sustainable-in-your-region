-- CreateEnum
CREATE TYPE "OfferState" AS ENUM ('NEW', 'REVIEWED', 'CHANGED');

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "offerState" "OfferState" NOT NULL DEFAULT 'NEW';
