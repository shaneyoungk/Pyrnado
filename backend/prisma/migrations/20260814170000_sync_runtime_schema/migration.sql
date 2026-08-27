-- Runtime schema additions that were present in schema.prisma but absent from
-- the original migrations. These are additive and safe for existing data.
ALTER TABLE "Remittance" ADD COLUMN "note" TEXT;
ALTER TABLE "Contract" ADD COLUMN "description" TEXT;
ALTER TABLE "Contract" ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Contract" ADD COLUMN "views" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "ContractBid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractId" TEXT NOT NULL,
    "contractorName" TEXT NOT NULL,
    "contractorEmail" TEXT NOT NULL,
    "proposal" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContractBid_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "AgentTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "agentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AgentTransaction_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "ContractBid_contractId_idx" ON "ContractBid"("contractId");
CREATE INDEX "AgentTransaction_agentId_idx" ON "AgentTransaction"("agentId");
