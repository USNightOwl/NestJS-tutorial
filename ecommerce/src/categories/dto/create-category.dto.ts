import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'title is required.' })
  @IsString({ message: 'title should be a string.' })
  title: string;

  @IsNotEmpty({ message: 'description is required.' })
  @IsString({ message: 'description should be a string.' })
  description: string;
}
