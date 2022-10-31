/*
  Warnings:

  - The primary key for the `aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_aluno` on the `aluno` table. All the data in the column will be lost.
  - The primary key for the `reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_aluno` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_reserva]` on the table `reserva` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_aluno` to the `reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_reserva` to the `reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" DROP CONSTRAINT "aluno_pkey",
DROP COLUMN "email_aluno",
ADD COLUMN     "email" VARCHAR(20) NOT NULL,
ADD COLUMN     "id_aluno" SERIAL NOT NULL,
ADD CONSTRAINT "aluno_pkey" PRIMARY KEY ("id_aluno");

-- AlterTable
ALTER TABLE "reserva" DROP CONSTRAINT "reserva_pkey",
DROP COLUMN "email_aluno",
ADD COLUMN     "id_aluno" INTEGER NOT NULL,
ADD COLUMN     "id_reserva" INTEGER NOT NULL,
ADD CONSTRAINT "reserva_pkey" PRIMARY KEY ("id_reserva");

-- DropTable
DROP TABLE "usuarios";

-- CreateIndex
CREATE UNIQUE INDEX "reserva_id_reserva_key" ON "reserva"("id_reserva");
