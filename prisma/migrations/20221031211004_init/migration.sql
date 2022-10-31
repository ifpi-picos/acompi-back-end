/*
  Warnings:

  - The `horario_inicio` column on the `criarturma` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `horario_fim` column on the `criarturma` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `proibelaboratorio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_professor]` on the table `professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_adm]` on the table `proibelaboratorio` will be added. If there are existing duplicate values, this will fail.
  - The required column `email_adm` was added to the `proibelaboratorio` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_lab` to the `proibelaboratorio` table without a default value. This is not possible if the table is not empty.
  - Made the column `data_inicio` on table `proibelaboratorio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_fim` on table `proibelaboratorio` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "proibelaboratorio_id_key";

-- AlterTable
ALTER TABLE "criarturma" DROP COLUMN "horario_inicio",
ADD COLUMN     "horario_inicio" TIMESTAMP(3),
DROP COLUMN "horario_fim",
ADD COLUMN     "horario_fim" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "professor" DROP CONSTRAINT "professor_pkey",
ADD COLUMN     "id_professor" SERIAL NOT NULL,
ADD CONSTRAINT "professor_pkey" PRIMARY KEY ("id_professor");

-- AlterTable
ALTER TABLE "proibelaboratorio" DROP COLUMN "id",
ADD COLUMN     "email_adm" VARCHAR(20) NOT NULL,
ADD COLUMN     "id_lab" INTEGER NOT NULL,
ALTER COLUMN "data_inicio" SET NOT NULL,
ALTER COLUMN "data_fim" SET NOT NULL;

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
    "horario_inicio" TIME(0),
    "horario_fim" TIME(0),
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
CREATE UNIQUE INDEX "proibelaboratorio_email_adm_key" ON "proibelaboratorio"("email_adm");

-- AddForeignKey
ALTER TABLE "proibelaboratorio" ADD CONSTRAINT "proibelaboratorio_email_adm_fkey" FOREIGN KEY ("email_adm") REFERENCES "administrador"("email_adm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proibelaboratorio" ADD CONSTRAINT "proibelaboratorio_id_lab_fkey" FOREIGN KEY ("id_lab") REFERENCES "laboratorio"("id_lab") ON DELETE RESTRICT ON UPDATE CASCADE;
