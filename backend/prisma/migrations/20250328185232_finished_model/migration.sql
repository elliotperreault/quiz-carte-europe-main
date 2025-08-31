/*
  Warnings:

  - Added the required column `group` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_update` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score_capitals` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score_countries` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "score_countries" INTEGER NOT NULL,
    "score_capitals" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "group" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" DATETIME NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
