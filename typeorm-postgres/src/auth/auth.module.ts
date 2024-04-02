import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { ArtistsModule } from "../artists/artists.module";
import { JwtModule } from "@nestjs/jwt";
import { authConstants } from "./auth.constants";
import { JwtStrategy } from "./jwt-strategy";
import { JwtAuthGuard } from "./jwt-guard";

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
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
