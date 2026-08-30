import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PapelUsuario } from "@radar/db";
import { Papeis, UsuarioAtual } from "../common/decorators";
import { ZodPipe } from "../common/zod.pipe";
import type { UsuarioAutenticado } from "../common/auth.types";
import { CarteiraService } from "./carteira.service";
import { ImportacaoService } from "./importacao.service";
import {
  AtualizarApoliceSchema,
  CriarApoliceSchema,
  ListarApolicesSchema,
  RegistrarPagamentoSchema,
} from "./carteira.dto";
import type {
  AtualizarApoliceDto,
  CriarApoliceDto,
  ListarApolicesDto,
  RegistrarPagamentoDto,
} from "./carteira.dto";

const TAMANHO_MAX_PLANILHA = 10 * 1024 * 1024; // 10 MB

@Controller("carteira")
export class CarteiraController {
  constructor(
    private readonly carteira: CarteiraService,
    private readonly importacao: ImportacaoService,
  ) {}

  @Post("apolices")
  criar(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Body(new ZodPipe(CriarApoliceSchema)) dto: CriarApoliceDto,
  ) {
    return this.carteira.criarApolice(usuario, dto);
  }

  @Get("apolices")
  listar(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Query(new ZodPipe(ListarApolicesSchema)) filtros: ListarApolicesDto,
  ) {
    return this.carteira.listarApolices(usuario, filtros);
  }

  @Get("apolices/:id")
  detalhar(@UsuarioAtual() usuario: UsuarioAutenticado, @Param("id") id: string) {
    return this.carteira.detalharApolice(usuario, id);
  }

  /** PII completa só para ADMIN/FINANCEIRO, com trilha de auditoria. */
  @Papeis(PapelUsuario.ADMIN, PapelUsuario.FINANCEIRO)
  @Get("apolices/:id/documento")
  revelarDocumento(@UsuarioAtual() usuario: UsuarioAutenticado, @Param("id") id: string) {
    return this.carteira.revelarDocumento(usuario, id);
  }

  @Patch("apolices/:id")
  atualizar(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Param("id") id: string,
    @Body(new ZodPipe(AtualizarApoliceSchema)) dto: AtualizarApoliceDto,
  ) {
    return this.carteira.atualizarApolice(usuario, id, dto);
  }

  @Post("parcelas/:id/pagamento")
  registrarPagamento(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Param("id") id: string,
    @Body(new ZodPipe(RegistrarPagamentoSchema)) dto: RegistrarPagamentoDto,
  ) {
    return this.carteira.registrarPagamento(usuario, id, dto);
  }

  @Post("importar")
  @UseInterceptors(FileInterceptor("arquivo", { limits: { fileSize: TAMANHO_MAX_PLANILHA } }))
  importar(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @UploadedFile() arquivo: Express.Multer.File | undefined,
  ) {
    if (!arquivo) {
      throw new BadRequestException('Envie a planilha no campo "arquivo" (multipart/form-data)');
    }
    return this.importacao.importarPlanilha(usuario, arquivo.buffer);
  }
}
