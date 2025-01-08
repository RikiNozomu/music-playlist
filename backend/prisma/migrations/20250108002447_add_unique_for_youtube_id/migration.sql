/*
  Warnings:

  - A unique constraint covering the columns `[youtubeId]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Song_youtubeId_key" ON "Song"("youtubeId");
