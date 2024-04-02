import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { PayloadType } from "./types";
import { ArtistsService } from "../artists/artists.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private artistsService: ArtistsService,
    private jwtService: JwtService,
  ) {}
  async login(
    loginDTO: LoginDTO,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
    const user = await this.userService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };
      const artist = await this.artistsService.findArtist(user.id);
      if (artist) {
        payload.artistId = artist.id;
      }
      if (user.enable2FA && user.twoFASecret) {
        return {
          validate2FA: "http://localhost:3000/auth/validate-2fa",
          message:
            "Please sends the one time password/token from your Google Authenticator App",
        };
      }

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException("Password does not match");
    }
  }
}
