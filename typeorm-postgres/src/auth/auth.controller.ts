import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { User } from "../users/user.entity";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-guard";
import { Enable2FAType } from "./types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ValidateTokenDTO } from "./dto/validate-token.dto";
import { UpdateResult } from "typeorm";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post("signup")
  @ApiOperation({ summary: "Register new user" })
  @ApiResponse({
    status: 201,
    description: "It will return the user in the response",
  })
  signup(@Body() userDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @ApiOperation({ summary: "Login user" })
  @ApiResponse({
    status: 201,
    description: "It will give you the access_token in the response",
  })
  @Post("login")
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Get("enable-2fa")
  @UseGuards(JwtAuthGuard)
  enable2FA(@Request() req): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  @Post("validate-2fa")
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Request()
    req,
    @Body()
    ValidateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token,
    );
  }

  @Get("disable-2fa")
  @UseGuards(JwtAuthGuard)
  disable2FA(
    @Request()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  @Get("test")
  testEnvVariable() {
    return this.authService.getEnvVariable();
  }
}
