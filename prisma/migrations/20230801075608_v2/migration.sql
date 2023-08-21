/*
  Warnings:

  - You are about to drop the column `service` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Candidates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `adminRole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `organizerId` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `lastGeneratedAt` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SendingStatus" AS ENUM ('NOT_START', 'SENDING', 'FINISHED', 'UNSENT');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Candidates" DROP CONSTRAINT "Candidates_examId_fkey";

-- DropForeignKey
ALTER TABLE "Candidates" DROP CONSTRAINT "Candidates_organizerId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "creatorId" INTEGER NOT NULL DEFAULT -999,
ADD COLUMN     "hasShares" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ownShares" INTEGER,
ALTER COLUMN "balance" SET DEFAULT '0';

-- AlterTable
ALTER TABLE "Exams" ADD COLUMN     "date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "service",
DROP COLUMN "status",
ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ALTER COLUMN "organizerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "lastGeneratedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Candidates";

-- DropTable
DROP TABLE "adminRole";

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "examId" INTEGER NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "reading" INTEGER,
    "listening" INTEGER,
    "writing" INTEGER,
    "speaking" INTEGER,
    "overall_score" INTEGER,
    "isFilled" BOOLEAN NOT NULL DEFAULT false,
    "isSent" BOOLEAN NOT NULL DEFAULT false,
    "status" "SendingStatus" NOT NULL DEFAULT 'NOT_START',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL DEFAULT -999,
    "name" TEXT NOT NULL,
    "permissions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_fkey" FOREIGN KEY ("id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
