/*
  Warnings:

  - You are about to drop the column `codigoConfirmacao` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `codigoConfirmacao` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `professor` table. All the data in the column will be lost.
  - The primary key for the `reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_reserva` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the `administrador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bloqueia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laboratorio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proibelaboratorio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[codigo_confirmacao]` on the table `aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo_confirmacao]` on the table `professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `reserva` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_lab,data_turma,horario_inicio,horario_fim]` on the table `turma` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo_confirmacao` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_confirmacao` to the `professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bloqueia" DROP CONSTRAINT "bloqueia_id_lab_fkey";

-- DropForeignKey
ALTER TABLE "proibelaboratorio" DROP CONSTRAINT "proibelaboratorio_id_lab_fkey";

-- DropForeignKey
ALTER TABLE "reserva" DROP CONSTRAINT "reserva_id_aluno_fkey";

-- DropForeignKey
ALTER TABLE "reserva" DROP CONSTRAINT "reserva_id_turma_fkey";

-- DropForeignKey
ALTER TABLE "turma" DROP CONSTRAINT "turma_id_professor_fkey";

-- DropIndex
DROP INDEX "aluno_codigoConfirmacao_key";

-- DropIndex
DROP INDEX "professor_codigoConfirmacao_key";

-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "codigoConfirmacao",
DROP COLUMN "estado",
ADD COLUMN     "codigo_confirmacao" TEXT NOT NULL,
ALTER COLUMN "senha" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "professor" DROP COLUMN "codigoConfirmacao",
DROP COLUMN "estado",
ADD COLUMN     "codigo_confirmacao" TEXT NOT NULL,
ALTER COLUMN "senha" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "reserva" DROP CONSTRAINT "reserva_pkey",
DROP COLUMN "id_reserva",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "reserva_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "administrador";

-- DropTable
DROP TABLE "bloqueia";

-- DropTable
DROP TABLE "laboratorio";

-- DropTable
DROP TABLE "proibelaboratorio";

-- CreateIndex
CREATE UNIQUE INDEX "aluno_codigo_confirmacao_key" ON "aluno"("codigo_confirmacao");

-- CreateIndex
CREATE UNIQUE INDEX "professor_codigo_confirmacao_key" ON "professor"("codigo_confirmacao");

-- CreateIndex
CREATE UNIQUE INDEX "reserva_id_key" ON "reserva"("id");

-- CreateIndex
CREATE UNIQUE INDEX "turma_id_lab_data_turma_horario_inicio_horario_fim_key" ON "turma"("id_lab", "data_turma", "horario_inicio", "horario_fim");

-- AddForeignKey
ALTER TABLE "turma" ADD CONSTRAINT "turma_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_turma_fkey" FOREIGN KEY ("id_turma") REFERENCES "turma"("id") ON DELETE CASCADE ON UPDATE CASCADE;
