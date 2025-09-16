/*
  Warnings:

  - A unique constraint covering the columns `[make,model]` on the table `CarModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CarModel_make_model_key" ON "public"."CarModel"("make", "model");
