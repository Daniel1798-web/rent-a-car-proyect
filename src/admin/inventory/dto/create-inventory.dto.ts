import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsInt, Min } from "class-validator";

export class CreateInventoryDto {
  @ApiProperty({
    example: "2bdeaa61-95fc-4751-a18b-43489269691e",
    description: "UUID de la sucursal"
  })
  @IsUUID()
  branchId: string;

  @ApiProperty({
    example: "af713e85-d77b-4d0e-8f98-3b35fa84d132",
    description: "UUID del modelo de auto"
  })
  @IsUUID()
  carModelId: string;

  @ApiProperty({
    example: 10,
    description: "Cantidad de autos disponibles en inventario"
  })
  @IsInt()
  @Min(0)
  quantity: number;
}
