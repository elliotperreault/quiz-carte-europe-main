/*
  Warnings:

  - You are about to drop the column `imgSrc` on the `Map` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Map" (
    "id" TEXT NOT NULL,
    "association" JSONB NOT NULL
);
INSERT INTO "new_Map" ("association", "id") SELECT "association", "id" FROM "Map";
DROP TABLE "Map";
ALTER TABLE "new_Map" RENAME TO "Map";
CREATE UNIQUE INDEX "Map_id_key" ON "Map"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
