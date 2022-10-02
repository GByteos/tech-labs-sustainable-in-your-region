/*
  Warnings:

  - You are about to drop the column `offerTypeId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the `OfferType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_offerTypeId_fkey";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "offerTypeId";

-- DropTable
DROP TABLE "OfferType";
