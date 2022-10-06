/*
  Warnings:

  - You are about to drop the column `offerTagId` on the `Offer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_offerTagId_fkey";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "offerTagId";

-- CreateTable
CREATE TABLE "_OfferToOfferTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OfferToOfferTag_AB_unique" ON "_OfferToOfferTag"("A", "B");

-- CreateIndex
CREATE INDEX "_OfferToOfferTag_B_index" ON "_OfferToOfferTag"("B");

-- AddForeignKey
ALTER TABLE "_OfferToOfferTag" ADD CONSTRAINT "_OfferToOfferTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfferToOfferTag" ADD CONSTRAINT "_OfferToOfferTag_B_fkey" FOREIGN KEY ("B") REFERENCES "OfferTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
