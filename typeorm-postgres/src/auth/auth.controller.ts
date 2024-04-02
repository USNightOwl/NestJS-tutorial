import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { User } from "../users/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private userService: UsersService) {}
  @Post("signup")
  signup(@Body() userDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }
}
