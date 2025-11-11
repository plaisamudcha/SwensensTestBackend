import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PRODUCT_MODES } from '../constant/mode.constant';
import type { ProductMode } from '../constant/mode.constant';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsEnum(PRODUCT_MODES)
  mode: ProductMode;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
