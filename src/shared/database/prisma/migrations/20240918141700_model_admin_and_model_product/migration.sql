-- CreateTable
CREATE TABLE "admin" (
    "adminId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "product" (
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "adminId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_adminId_key" ON "admin"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "product_productId_key" ON "product"("productId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("adminId") ON DELETE CASCADE ON UPDATE CASCADE;
