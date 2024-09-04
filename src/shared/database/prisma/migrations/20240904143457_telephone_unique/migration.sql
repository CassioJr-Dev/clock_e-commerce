/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_telephone_key" ON "user"("telephone");
