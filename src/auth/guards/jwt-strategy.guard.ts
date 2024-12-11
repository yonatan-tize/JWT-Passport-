import { AuthGuard } from "@nestjs/passport";

export class JwtStrategyGuard extends AuthGuard('jwt'){}