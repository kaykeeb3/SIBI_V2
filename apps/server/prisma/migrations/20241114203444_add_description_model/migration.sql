-- CreateTable
CREATE TABLE "Description" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "relatedData" JSONB NOT NULL,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("id")
);
