/**
 * Seed do catálogo global de seguradoras (únicas tabelas sem tenant).
 * Idempotente: upsert por slug.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seguradoras = [
  { slug: "porto-seguro", nome: "Porto Seguro" },
  { slug: "tokio-marine", nome: "Tokio Marine" },
  { slug: "bradesco-seguros", nome: "Bradesco Seguros" },
];

async function main() {
  for (const s of seguradoras) {
    await prisma.insurer.upsert({
      where: { slug: s.slug },
      create: s,
      update: { nome: s.nome },
    });
  }
  console.log(`Seed concluído: ${seguradoras.length} seguradoras.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
