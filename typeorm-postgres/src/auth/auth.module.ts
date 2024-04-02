import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { ArtistsModule } from "src/artists/artists.module";
import { JwtModule } from "@nestjs/jwt";
import { authConstants } from "./auth.constants";

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
