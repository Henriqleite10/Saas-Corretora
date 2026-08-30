import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module";
import { ConfiguracoesController } from "./configuracoes.controller";

@Module({
  imports: [AuditModule],
  controllers: [ConfiguracoesController],
})
export class ConfiguracoesModule {}
