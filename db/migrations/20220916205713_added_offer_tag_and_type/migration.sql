-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "offerTagId" INTEGER,
ADD COLUMN     "offerTypeId" INTEGER,
ADD COLUMN     "openingTimes" TEXT,
ALTER COLUMN "link" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OfferType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OfferType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferTag" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OfferTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_offerTypeId_fkey" FOREIGN KEY ("offerTypeId") REFERENCES "OfferType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_offerTagId_fkey" FOREIGN KEY ("offerTagId") REFERENCES "OfferTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
