import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsPositive, IsOptional, IsDateString } from "class-validator";

export class CreateDiscountDto {
  @ApiProperty({ description: "Código del descuento (ej: 'SUMMER10')" })
  @IsString()
  code: string;

  @ApiProperty({ description: "Porcentaje de descuento (ej: 10 = 10%)" })
  @IsNumber()
  @IsPositive()
  percentage: number;

  @ApiProperty({ description: "ID del cliente", required: false })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ description: "Fecha de inicio del descuento (YYYY-MM-DD)", required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: "Fecha de fin del descuento (YYYY-MM-DD)", required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
