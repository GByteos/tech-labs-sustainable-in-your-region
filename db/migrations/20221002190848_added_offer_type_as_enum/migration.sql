-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('SHOP', 'EVENT');

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "OfferType" "OfferType" NOT NULL DEFAULT 'SHOP';
