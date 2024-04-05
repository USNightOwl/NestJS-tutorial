import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Product should not be empty.' })
  @IsNumber({}, { message: 'Product Id should be number' })
  productId: number;

  @IsNotEmpty({ message: 'ratings could not be empty' })
  @IsNumber()
  @IsInt({ message: 'Ratings could not be a decimal number' })
  @IsPositive({ message: 'ratings could not be negative' })
  @Max(5, { message: 'ratings could not be greater than 5' })
  ratings: number;

  @IsNotEmpty({ message: 'comment should not be empty' })
  @IsString()
  comment: string;
}
