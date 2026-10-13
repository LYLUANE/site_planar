import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import type { ServerResponse } from 'node:http';
import { resolve } from 'node:path';
import { VariaveisAmbiente } from './config/env.validation';

export function configurarApp(app: NestExpressApplication) {
  const config = app.get(ConfigService<VariaveisAmbiente, true>);

  app.use(helmet());
  app.useBodyParser('json', { limit: '20kb' });

  app.enableCors({
    origin: config
      .get('FRONTEND_URL', { infer: true })
      .split(',')
      .map((origem) => origem.trim()),
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useStaticAssets(resolve(config.get('UPLOADS_DIR', { infer: true })), {
    prefix: '/uploads/',
    index: false,
    dotfiles: 'deny',
    setHeaders: (res: ServerResponse) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Cache-Control', 'public, max-age=86400');
    },
  });

  app.enableShutdownHooks();
}
