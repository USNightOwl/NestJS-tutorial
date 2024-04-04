import { Type } from 'class-transformer';
import { CreateShippingDto } from './create-shipping.dto';
import { OrderedProductsDto } from './ordered-products.dto';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @ValidateNested() // use type so if you validate you must have use validateNested
  @Type(() => CreateShippingDto)
  shippingAddress: CreateShippingDto;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true }) // each for arrays
  @Type(() => OrderedProductsDto)
  orderedProducts: OrderedProductsDto[];
}
