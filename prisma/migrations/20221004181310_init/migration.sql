/*
  Warnings:

  - Added the required column `senha` to the `aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" ADD COLUMN     "senha" TEXT NOT NULL;
