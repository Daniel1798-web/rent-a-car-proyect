import { IsUUID, IsDateString } from "class-validator";

export class CreateReservationDto {
  @IsUUID()
  carModelId: string;

  @IsUUID()
  branchId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
