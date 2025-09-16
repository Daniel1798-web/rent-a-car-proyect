import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsDateString } from "class-validator";

export class CarsQueryDto {
  @ApiPropertyOptional({ description: "ID de la sucursal" })
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiPropertyOptional({ description: "Fecha de inicio (YYYY-MM-DD)" })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: "Fecha de fin (YYYY-MM-DD)" })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
