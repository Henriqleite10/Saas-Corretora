import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma/prisma.module";
import { PiiModule } from "./pii/pii.module";
import { AuthModule } from "./auth/auth.module";
import { AuditModule } from "./audit/audit.module";
import { CarteiraModule } from "./carteira/carteira.module";
import { CobrancasModule } from "./cobrancas/cobrancas.module";
import { ConfiguracoesModule } from "./configuracoes/configuracoes.module";
import { ExtratosModule } from "./extratos/extratos.module";
import { FilaModule } from "./fila/fila.module";
import { RadarModule } from "./radar/radar.module";
import { SeguradorasModule } from "./seguradoras/seguradoras.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { PapeisGuard } from "./auth/papeis.guard";

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    PiiModule,
    AuditModule,
    FilaModule,
    AuthModule,
    CarteiraModule,
    CobrancasModule,
    ConfiguracoesModule,
    ExtratosModule,
    RadarModule,
    SeguradorasModule,
  ],
  providers: [
    // Ordem importa: rate limit → autenticação → papéis
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PapeisGuard },
  ],
})
export class AppModule {}
