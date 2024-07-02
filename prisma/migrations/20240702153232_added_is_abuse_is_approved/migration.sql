-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isAbuse" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
