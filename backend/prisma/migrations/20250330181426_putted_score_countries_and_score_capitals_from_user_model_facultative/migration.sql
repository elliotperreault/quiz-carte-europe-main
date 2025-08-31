-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "score_countries" INTEGER,
    "score_capitals" INTEGER,
    "username" TEXT NOT NULL,
    "group" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" DATETIME NOT NULL
);
INSERT INTO "new_User" ("created_at", "group", "id", "last_update", "score_capitals", "score_countries", "username") SELECT "created_at", "group", "id", "last_update", "score_capitals", "score_countries", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
