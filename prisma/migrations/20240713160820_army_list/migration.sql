-- CreateTable
CREATE TABLE "ArmyList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roster" TEXT NOT NULL,
    "faction" TEXT NOT NULL,
    "subFaction" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArmyList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArmyList" ADD CONSTRAINT "ArmyList_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
