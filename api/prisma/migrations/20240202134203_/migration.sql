/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_nome_key` ON `User`(`nome`);
