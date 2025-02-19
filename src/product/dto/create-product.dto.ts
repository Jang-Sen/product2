import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '헤비 그라운드 모헤어 니트', description: '제품명' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '상의', description: '제품 종류' })
  category: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: 39900, description: '제품 가격' })
  price: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: 10, description: '제품 수량' })
  stock: number;
}
