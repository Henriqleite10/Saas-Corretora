import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module";
import { CarteiraController } from "./carteira.controller";
import { CarteiraService } from "./carteira.service";
import { ImportacaoService } from "./importacao.service";

@Module({
  imports: [AuditModule],
  controllers: [CarteiraController],
  providers: [CarteiraService, ImportacaoService],
  exports: [CarteiraService],
})
export class CarteiraModule {}
