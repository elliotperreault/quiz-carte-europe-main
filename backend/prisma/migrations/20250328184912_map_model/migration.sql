/*
  Warnings:

  - Added the required column `association` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgSrc` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Map" (
    "id" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "association" JSONB NOT NULL
);
INSERT INTO "new_Map" ("id") SELECT "id" FROM "Map";
DROP TABLE "Map";
ALTER TABLE "new_Map" RENAME TO "Map";
CREATE UNIQUE INDEX "Map_id_key" ON "Map"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
