-- CreateTable
CREATE TABLE "Messages" (
    "msgId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recieverId" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("msgId")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
