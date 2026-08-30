import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { config } from "./config";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({ origin: config().WEB_URL, credentials: true });
  app.enableShutdownHooks();
  await app.listen(config().API_PORT);
  console.log(`API ouvindo em http://localhost:${config().API_PORT}/api`);
}

void bootstrap();
