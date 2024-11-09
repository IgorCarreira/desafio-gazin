/*
  Warnings:

  - Added the required column `sexo` to the `Desenvolvedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Desenvolvedor" ADD COLUMN     "sexo" CHAR NOT NULL;
