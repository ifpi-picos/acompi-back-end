/*
  Warnings:

  - The primary key for the `aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `aluno` table. All the data in the column will be lost.
  - Added the required column `email_aluno` to the `aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" DROP CONSTRAINT "aluno_pkey",
DROP COLUMN "email",
ADD COLUMN     "email_aluno" VARCHAR(20) NOT NULL,
ADD CONSTRAINT "aluno_pkey" PRIMARY KEY ("email_aluno");

-- CreateTable
CREATE TABLE "reserva" (
    "email_aluno" VARCHAR(20) NOT NULL,
    "id_turma" INTEGER NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("email_aluno")
);

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_email_aluno_fkey" FOREIGN KEY ("email_aluno") REFERENCES "aluno"("email_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;
