import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { z } from "zod";
import { UsuarioAtual } from "../common/decorators";
import { ZodPipe } from "../common/zod.pipe";
import type { UsuarioAutenticado } from "../common/auth.types";
import { ExtratosService } from "./extratos.service";

const UploadSchema = z.object({
  insurerSlug: z.string().min(1),
  competencia: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use o formato "AAAA-MM"'),
});
type UploadDto = z.infer<typeof UploadSchema>;

const TAMANHO_MAX = 15 * 1024 * 1024; // 15 MB

@Controller("extratos")
export class ExtratosController {
  constructor(private readonly extratos: ExtratosService) {}

  @Post()
  @UseInterceptors(FileInterceptor("arquivo", { limits: { fileSize: TAMANHO_MAX } }))
  enviar(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Body(new ZodPipe(UploadSchema)) dto: UploadDto,
    @UploadedFile() arquivo: Express.Multer.File | undefined,
  ) {
    if (!arquivo) {
      throw new BadRequestException('Envie o extrato no campo "arquivo" (multipart/form-data)');
    }
    return this.extratos.receberUpload(
      usuario,
      dto.insurerSlug,
      dto.competencia,
      arquivo.originalname,
      arquivo.buffer,
    );
  }

  @Get()
  listar(@UsuarioAtual() usuario: UsuarioAutenticado) {
    return this.extratos.listar(usuario);
  }

  @Get(":id")
  detalhar(@UsuarioAtual() usuario: UsuarioAutenticado, @Param("id") id: string) {
    return this.extratos.detalhar(usuario, id);
  }

  @Post(":id/reprocessar")
  reprocessar(@UsuarioAtual() usuario: UsuarioAutenticado, @Param("id") id: string) {
    return this.extratos.reprocessar(usuario, id);
  }
}
