import { Injectable, Logger, OnApplicationShutdown } from "@nestjs/common";
import { Queue } from "bullmq";
import IORedis from "ioredis";

/** Produtor BullMQ da API — os consumidores vivem em apps/worker. */
@Injectable()
export class FilaService implements OnApplicationShutdown {
  private readonly logger = new Logger(FilaService.name);
  private conexao: IORedis | null = null;
  private readonly filas = new Map<string, Queue>();

  private fila(nome: string): Queue {
    if (!this.conexao) {
      this.conexao = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
        maxRetriesPerRequest: null,
      });
    }
    let fila = this.filas.get(nome);
    if (!fila) {
      fila = new Queue(nome, { connection: this.conexao });
      this.filas.set(nome, fila);
    }
    return fila;
  }

  async enfileirar(nomeFila: string, dados: object, jobId?: string): Promise<void> {
    await this.fila(nomeFila).add(nomeFila, dados, {
      ...(jobId ? { jobId } : {}),
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
      removeOnComplete: 1000,
      removeOnFail: 5000,
    });
    this.logger.log(`Job enfileirado em "${nomeFila}"${jobId ? ` (${jobId})` : ""}`);
  }

  async onApplicationShutdown(): Promise<void> {
    await Promise.all([...this.filas.values()].map((f) => f.close()));
    await this.conexao?.quit();
  }
}
