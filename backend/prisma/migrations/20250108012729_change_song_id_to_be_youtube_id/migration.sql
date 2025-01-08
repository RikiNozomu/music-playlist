/*
  Warnings:

  - The primary key for the `Song` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `youtubeId` on the `Song` table. All the data in the column will be lost.
  - The primary key for the `SongInPlaylist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SongInPlaylist" DROP CONSTRAINT "SongInPlaylist_songId_fkey";

-- DropIndex
DROP INDEX "Song_youtubeId_key";

-- AlterTable
ALTER TABLE "Song" DROP CONSTRAINT "Song_pkey",
DROP COLUMN "youtubeId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Song_id_seq";

-- AlterTable
ALTER TABLE "SongInPlaylist" DROP CONSTRAINT "SongInPlaylist_pkey",
ALTER COLUMN "songId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SongInPlaylist_pkey" PRIMARY KEY ("songId", "playlistId");

-- CreateIndex
CREATE UNIQUE INDEX "Song_id_key" ON "Song"("id");

-- AddForeignKey
ALTER TABLE "SongInPlaylist" ADD CONSTRAINT "SongInPlaylist_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
