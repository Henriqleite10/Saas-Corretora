import { BadRequestException } from "@nestjs/common";
import type { PipeTransform } from "@nestjs/common";
import type { ZodType } from "zod";

/** Validação Zod em toda borda da API (requisito seção 8 do briefing). */
export class ZodPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    const resultado = this.schema.safeParse(value);
    if (!resultado.success) {
      throw new BadRequestException({
        mensagem: "Dados inválidos",
        erros: resultado.error.issues.map((i) => ({
          campo: i.path.join("."),
          detalhe: i.message,
        })),
      });
    }
    return resultado.data;
  }
}
