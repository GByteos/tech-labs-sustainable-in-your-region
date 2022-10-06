/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `OfferTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OfferTag_name_key" ON "OfferTag"("name");
