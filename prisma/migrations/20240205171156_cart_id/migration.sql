/*
  Warnings:

  - You are about to drop the column `province` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `village` on the `User` table. All the data in the column will be lost.
  - Changed the type of `phone` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "province",
DROP COLUMN "village",
ALTER COLUMN "cartId" DROP NOT NULL,
DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;
