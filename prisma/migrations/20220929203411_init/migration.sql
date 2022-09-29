/*
  Warnings:

  - The primary key for the `aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `email` on the `aluno` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "aluno" DROP CONSTRAINT "aluno_pkey",
ALTER COLUMN "email" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "aluno_pkey" PRIMARY KEY ("email");
