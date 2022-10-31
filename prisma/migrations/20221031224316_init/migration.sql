/*
  Warnings:

  - You are about to drop the column `computador` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `curso` on the `reserva` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reserva" DROP COLUMN "computador",
DROP COLUMN "curso";
