/*
  Warnings:

  - Added the required column `updatedAt` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Ration" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rationKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leftover" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftoverKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Leftover_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ration" ADD CONSTRAINT "Ration_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leftover" ADD CONSTRAINT "Leftover_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
