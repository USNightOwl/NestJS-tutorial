import { IsNotEmpty, IsString } from 'class-validator';
import { UserSignInDTO } from './user-signin.dto';

export class UserSignUpDTO extends UserSignInDTO {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name should be a string' })
  name: string;
}
