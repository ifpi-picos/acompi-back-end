/*
  Warnings:

  - The primary key for the `aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_aluno` on the `aluno` table. All the data in the column will be lost.
  - The primary key for the `professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_aluno` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email_professor]` on the table `professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_reserva]` on the table `reserva` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_aluno` to the `reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" DROP CONSTRAINT "aluno_pkey",
DROP COLUMN "email_aluno",
ADD COLUMN     "email" VARCHAR(20) NOT NULL,
ADD COLUMN     "id_aluno" SERIAL NOT NULL,
ADD CONSTRAINT "aluno_pkey" PRIMARY KEY ("id_aluno");

-- AlterTable
ALTER TABLE "professor" DROP CONSTRAINT "professor_pkey",
ADD COLUMN     "id_professor" SERIAL NOT NULL,
ADD CONSTRAINT "professor_pkey" PRIMARY KEY ("id_professor");

-- AlterTable
ALTER TABLE "reserva" DROP CONSTRAINT "reserva_pkey",
DROP COLUMN "email_aluno",
ADD COLUMN     "id_aluno" INTEGER NOT NULL,
ADD COLUMN     "id_reserva" SERIAL NOT NULL,
ADD CONSTRAINT "reserva_pkey" PRIMARY KEY ("id_reserva");

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "laboratorio" (
    "id_lab" SERIAL NOT NULL,
    "quantidade_computadores" INTEGER NOT NULL,

    CONSTRAINT "laboratorio_pkey" PRIMARY KEY ("id_lab")
);

-- CreateTable
CREATE TABLE "bloqueia" (
    "email_professor" VARCHAR(20) NOT NULL,
    "id_lab" INTEGER NOT NULL,
    "horario_inicio" TIME(0) NOT NULL,
    "horario_fim" TIME(0) NOT NULL,
    "data_inicio_bloqueia" TIMESTAMP(3) NOT NULL,
    "data_fim_bloqueia" TIMESTAMP(3) NOT NULL,
    "dia_semana" VARCHAR(20) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "laboratorio_id_lab_key" ON "laboratorio"("id_lab");

-- CreateIndex
CREATE UNIQUE INDEX "bloqueia_email_professor_key" ON "bloqueia"("email_professor");

-- CreateIndex
CREATE UNIQUE INDEX "bloqueia_horario_inicio_key" ON "bloqueia"("horario_inicio");

-- CreateIndex
CREATE UNIQUE INDEX "bloqueia_dia_semana_key" ON "bloqueia"("dia_semana");

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_professor_key" ON "professor"("email_professor");

-- CreateIndex
CREATE UNIQUE INDEX "reserva_id_reserva_key" ON "reserva"("id_reserva");
