import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module";
import { CobrancasController } from "./cobrancas.controller";
import { CobrancasService } from "./cobrancas.service";

@Module({
  imports: [AuditModule],
  controllers: [CobrancasController],
  providers: [CobrancasService],
})
export class CobrancasModule {}
