import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserSignInDTO {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password must be at least.' })
  @MinLength(5, { message: 'Password must be at least 5 characters' })
  password: string;
}
