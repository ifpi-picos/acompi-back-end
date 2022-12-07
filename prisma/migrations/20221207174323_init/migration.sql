/*
  Warnings:

  - You are about to drop the column `email_adm` on the `administrador` table. All the data in the column will be lost.
  - You are about to drop the column `nome_adm` on the `administrador` table. All the data in the column will be lost.
  - The primary key for the `professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_professor` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `id_professor` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `email_adm` on the `proibelaboratorio` table. All the data in the column will be lost.
  - You are about to drop the column `consentimento` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the `criarturma` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `administrador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoConfirmacao]` on the table `aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,status]` on the table `aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `bloqueia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoConfirmacao]` on the table `professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,status]` on the table `professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `proibelaboratorio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_aluno,id_turma]` on the table `reserva` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `administrador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `administrador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `administrador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoConfirmacao` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoConfirmacao` to the `professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "proibelaboratorio" DROP CONSTRAINT "proibelaboratorio_email_adm_fkey";

-- DropIndex
DROP INDEX "administrador_email_adm_key";

-- DropIndex
DROP INDEX "bloqueia_dia_semana_key";

-- DropIndex
DROP INDEX "bloqueia_email_professor_key";

-- DropIndex
DROP INDEX "bloqueia_horario_inicio_key";

-- DropIndex
DROP INDEX "professor_email_professor_key";

-- DropIndex
DROP INDEX "proibelaboratorio_email_adm_key";

-- DropIndex
DROP INDEX "reserva_id_reserva_key";

-- AlterTable
ALTER TABLE "administrador" DROP COLUMN "email_adm",
DROP COLUMN "nome_adm",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "senha" VARCHAR NOT NULL,
ADD CONSTRAINT "administrador_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "aluno" ADD COLUMN     "codigoConfirmacao" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN,
ALTER COLUMN "senha" SET DATA TYPE VARCHAR,
ALTER COLUMN "email" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "bloqueia" ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "professor" DROP CONSTRAINT "professor_pkey",
DROP COLUMN "email_professor",
DROP COLUMN "id_professor",
ADD COLUMN     "codigoConfirmacao" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'ativo',
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "status" BOOLEAN,
ALTER COLUMN "senha" SET DATA TYPE VARCHAR,
ADD CONSTRAINT "professor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "proibelaboratorio" DROP COLUMN "email_adm",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "data_inicio" DROP NOT NULL,
ALTER COLUMN "data_fim" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE reserva_id_reserva_seq;
ALTER TABLE "reserva" DROP COLUMN "consentimento",
ALTER COLUMN "id_reserva" SET DEFAULT nextval('reserva_id_reserva_seq');
ALTER SEQUENCE reserva_id_reserva_seq OWNED BY "reserva"."id_reserva";

-- DropTable
DROP TABLE "criarturma";

-- CreateTable
CREATE TABLE "turma" (
    "id_lab" INTEGER NOT NULL,
    "data_turma" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "horario_inicio" TEXT NOT NULL,
    "horario_fim" TEXT NOT NULL,
    "id_professor" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_key" ON "administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_codigoConfirmacao_key" ON "aluno"("codigoConfirmacao");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_status_key" ON "aluno"("email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "bloqueia_id_key" ON "bloqueia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "professor_codigoConfirmacao_key" ON "professor"("codigoConfirmacao");

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_status_key" ON "professor"("email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "proibelaboratorio_id_key" ON "proibelaboratorio"("id");

-- CreateIndex
CREATE UNIQUE INDEX "reserva_id_aluno_id_turma_key" ON "reserva"("id_aluno", "id_turma");

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_turma_fkey" FOREIGN KEY ("id_turma") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bloqueia" ADD CONSTRAINT "bloqueia_id_lab_fkey" FOREIGN KEY ("id_lab") REFERENCES "laboratorio"("id_lab") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turma" ADD CONSTRAINT "turma_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
