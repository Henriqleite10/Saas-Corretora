import { Controller, Get, Post, Query } from "@nestjs/common";
import { UsuarioAtual } from "../common/decorators";
import { ZodPipe } from "../common/zod.pipe";
import type { UsuarioAutenticado } from "../common/auth.types";
import { RadarService } from "./radar.service";
import { FiltrosRadarSchema } from "./radar.dto";
import type { FiltrosRadarDto } from "./radar.dto";

@Controller("radar")
export class RadarController {
  constructor(private readonly radar: RadarService) {}

  @Get("resumo")
  resumo(@UsuarioAtual() usuario: UsuarioAutenticado) {
    return this.radar.resumo(usuario);
  }

  @Get("parcelas-atrasadas")
  parcelasAtrasadas(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Query(new ZodPipe(FiltrosRadarSchema)) filtros: FiltrosRadarDto,
  ) {
    return this.radar.parcelasAtrasadas(usuario, filtros);
  }

  @Post("executar")
  executar(@UsuarioAtual() usuario: UsuarioAutenticado) {
    return this.radar.executar(usuario);
  }
}
