import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configurarApp } from './configurar-app';
import { VariaveisAmbiente } from './config/env.validation';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configurarApp(app);

  const config = app.get(ConfigService<VariaveisAmbiente, true>);
  const porta = config.get('PORT', { infer: true });
  await app.listen(porta);
  console.log(`API rodando em http://localhost:${porta}/api`);
}
void bootstrap();
