/*
  Warnings:

  - The primary key for the `cartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cartItemId` on the `cartItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ItemId]` on the table `cartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ItemId` to the `cartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cartItem_cartItemId_key";

-- AlterTable
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_pkey",
DROP COLUMN "cartItemId",
ADD COLUMN     "ItemId" TEXT NOT NULL,
ADD CONSTRAINT "cartItem_pkey" PRIMARY KEY ("ItemId");

-- CreateIndex
CREATE UNIQUE INDEX "cartItem_ItemId_key" ON "cartItem"("ItemId");
