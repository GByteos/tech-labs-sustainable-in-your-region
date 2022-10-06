-- CreateEnum
CREATE TYPE "OfferTagCategory" AS ENUM ('CONSUME', 'ENERGY', 'EDUCATION', 'HEALTH', 'INCLUSIVITY');

-- AlterTable
ALTER TABLE "OfferTag" ADD COLUMN     "category" "OfferTagCategory"[];
