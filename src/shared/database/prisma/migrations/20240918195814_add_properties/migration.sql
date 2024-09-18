/*
  Warnings:

  - Added the required column `category` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "category" VARCHAR(100) NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "oldPrice" DECIMAL(10,2);
