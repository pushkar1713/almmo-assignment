/*
  Warnings:

  - A unique constraint covering the columns `[affiliateId,campaignId,clickId]` on the table `clicks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."conversions" DROP CONSTRAINT "conversions_clickId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "clicks_affiliateId_campaignId_clickId_key" ON "public"."clicks"("affiliateId", "campaignId", "clickId");

-- AddForeignKey
ALTER TABLE "public"."conversions" ADD CONSTRAINT "conversions_clickId_fkey" FOREIGN KEY ("clickId") REFERENCES "public"."clicks"("clickId") ON DELETE RESTRICT ON UPDATE CASCADE;
