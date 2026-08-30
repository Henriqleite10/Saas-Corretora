import { BadRequestException } from "@nestjs/common";
import type { PipeTransform } from "@nestjs/common";
import type { ZodTypeAny, z } from "zod";

/** Validação Zod em toda borda da API (requisito seção 8 do briefing). */
export class ZodPipe<S extends ZodTypeAny> implements PipeTransform<unknown, z.output<S>> {
  constructor(private readonly schema: S) {}

  transform(value: unknown): z.output<S> {
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
    return resultado.data as z.output<S>;
  }
}
