/*
  Warnings:

  - You are about to drop the column `date` on the `Exams` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Exams` table. All the data in the column will be lost.
  - You are about to drop the column `descr` on the `Exams` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Candidate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tokenId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Organizer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `Organizer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tokenId]` on the table `Organizer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam_type` to the `Exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `Exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_type` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trial_period` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Permissions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MainRoles" AS ENUM ('CANDIDATE', 'ADMIN', 'ORGANIZER');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_examId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_organizerId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tokenId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Exams" DROP COLUMN "date",
DROP COLUMN "deadline",
DROP COLUMN "descr",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exam_type" TEXT NOT NULL,
ADD COLUMN     "organizerId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "cost" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Organizer" ADD COLUMN     "account_type" TEXT NOT NULL,
ADD COLUMN     "balance" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "started_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "surname" TEXT NOT NULL,
ADD COLUMN     "tokenId" INTEGER NOT NULL,
ADD COLUMN     "trial_period" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "candidateId";

-- AlterTable
ALTER TABLE "Permissions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Bookings";

-- DropTable
DROP TABLE "Candidate";

-- DropTable
DROP TABLE "Results";

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "Candidates" (
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
    "isResultSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permissions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "organizerId" INTEGER,
    "adminId" INTEGER,
    "accessToken" TEXT,
    "refreshToken" TEXT NOT NULL,
    "userRole" "MainRoles" NOT NULL,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_organizerId_key" ON "Token"("organizerId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_adminId_key" ON "Token"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_accessToken_key" ON "Token"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Token_refreshToken_key" ON "Token"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_tokenId_key" ON "Admin"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_email_key" ON "Organizer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_phone_number_key" ON "Organizer"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_tokenId_key" ON "Organizer"("tokenId");

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_fkey" FOREIGN KEY ("id") REFERENCES "adminRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
