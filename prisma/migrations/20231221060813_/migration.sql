/*
  Warnings:

  - You are about to drop the column `selected` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `selected` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Board` DROP COLUMN `selected`;
