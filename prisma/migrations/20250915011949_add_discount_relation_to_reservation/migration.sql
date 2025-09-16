-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "public"."Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
