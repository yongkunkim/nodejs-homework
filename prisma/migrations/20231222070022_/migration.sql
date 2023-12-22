/*
  Warnings:

  - A unique constraint covering the columns `[selected]` on the table `Answers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Answers_boardId_selected_key` ON `Answers`;

-- CreateIndex
CREATE UNIQUE INDEX `Answers_selected_key` ON `Answers`(`selected`);
