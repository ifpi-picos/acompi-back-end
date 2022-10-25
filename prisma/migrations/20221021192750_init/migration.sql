/*
  Warnings:

  - The primary key for the `criarturma` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "criarturma" DROP CONSTRAINT "criarturma_pkey",
ALTER COLUMN "email_professor" DROP NOT NULL;
