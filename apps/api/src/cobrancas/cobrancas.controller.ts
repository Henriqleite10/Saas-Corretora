import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsuarioAtual } from "../common/decorators";
import { ZodPipe } from "../common/zod.pipe";
import type { UsuarioAutenticado } from "../common/auth.types";
import { CobrancasService } from "./cobrancas.service";
import { AprovarMensagemSchema } from "./cobrancas.dto";
import type { AprovarMensagemDto } from "./cobrancas.dto";

@Controller("cobrancas")
export class CobrancasController {
  constructor(private readonly cobrancas: CobrancasService) {}

  @Get("aprovacoes")
  listarAprovacoes(@UsuarioAtual() usuario: UsuarioAutenticado) {
    return this.cobrancas.listarAprovacoes(usuario);
  }

  @Get("historico")
  listarHistorico(@UsuarioAtual() usuario: UsuarioAutenticado) {
    return this.cobrancas.listarHistorico(usuario);
  }

  @Post("mensagens/:id/aprovar")
  aprovar(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Param("id") id: string,
    @Body(new ZodPipe(AprovarMensagemSchema)) dto: AprovarMensagemDto,
  ) {
    return this.cobrancas.aprovar(usuario, id, dto);
  }

  @Post("mensagens/:id/descartar")
  descartar(@UsuarioAtual() usuario: UsuarioAutenticado, @Param("id") id: string) {
    return this.cobrancas.descartar(usuario, id);
  }
}
