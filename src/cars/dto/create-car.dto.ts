import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsPositive } from "class-validator";

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  make: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  seats: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  dailyRate: number;
}
