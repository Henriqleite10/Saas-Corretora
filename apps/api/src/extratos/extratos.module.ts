import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module";
import { ExtratosController } from "./extratos.controller";
import { ExtratosService } from "./extratos.service";

@Module({
  imports: [AuditModule],
  controllers: [ExtratosController],
  providers: [ExtratosService],
})
export class ExtratosModule {}
