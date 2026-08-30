import { Module } from "@nestjs/common";
import { SeguradorasController } from "./seguradoras.controller";

@Module({
  controllers: [SeguradorasController],
})
export class SeguradorasModule {}
