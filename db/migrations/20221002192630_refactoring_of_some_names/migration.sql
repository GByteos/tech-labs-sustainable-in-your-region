/*
  Warnings:

  - You are about to drop the column `OfferType` on the `Offer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "OfferType",
ADD COLUMN     "offerType" "OfferType" NOT NULL DEFAULT 'SHOP';
