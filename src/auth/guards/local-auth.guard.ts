import { AuthGuard } from "@nestjs/passport";

export class LocalStrategyAuth extends AuthGuard('local'){}