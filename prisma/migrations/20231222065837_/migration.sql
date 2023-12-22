/*
  Warnings:

  - A unique constraint covering the columns `[boardId,selected]` on the table `Answers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Answers_boardId_selected_key` ON `Answers`(`boardId`, `selected`);
