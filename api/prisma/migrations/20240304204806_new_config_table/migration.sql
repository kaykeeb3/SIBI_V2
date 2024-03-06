/*
  Warnings:

  - You are about to drop the column `data` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `equipmentId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `dataDevolucao` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipamentoId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_equipmentId_fkey`;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `data`,
    DROP COLUMN `equipmentId`,
    ADD COLUMN `dataDevolucao` DATETIME(3) NOT NULL,
    ADD COLUMN `dataInicio` DATETIME(3) NOT NULL,
    ADD COLUMN `equipamentoId` INTEGER NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantidade` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_equipamentoId_fkey` FOREIGN KEY (`equipamentoId`) REFERENCES `Equipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
