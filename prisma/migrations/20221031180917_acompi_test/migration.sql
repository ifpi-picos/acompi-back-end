/*
  Warnings:

  - The primary key for the `aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_aluno` on the `aluno` table. All the data in the column will be lost.
  - Added the required column `computador` to the `reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consentimento` to the `reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curso` to the `reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" DROP CONSTRAINT "aluno_pkey",
DROP COLUMN "id_aluno",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'ativo',
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "aluno_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reserva" ADD COLUMN     "computador" TEXT NOT NULL,
ADD COLUMN     "consentimento" BOOLEAN NOT NULL,
ADD COLUMN     "curso" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_turma_fkey" FOREIGN KEY ("id_turma") REFERENCES "criarturma"("id_turma") ON DELETE RESTRICT ON UPDATE CASCADE;
