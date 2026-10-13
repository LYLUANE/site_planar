import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PapeisGuard } from './auth/guards/papeis.guard';
import { validarAmbiente, VariaveisAmbiente } from './config/env.validation';
import { ProdutosModule } from './produtos/produtos.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validarAmbiente }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (
        config: ConfigService<VariaveisAmbiente, true>,
      ): TypeOrmModuleOptions => {
        const base = {
          autoLoadEntities: true,
          // Cria/atualiza as tabelas a partir das entidades. Simples para começar;
          // num banco de produção com dados importantes, troque por migrations.
          synchronize: true,
        };

        if (config.get('DB_TYPE', { infer: true }) === 'postgres') {
          return {
            ...base,
            type: 'postgres',
            url: config.get('DATABASE_URL', { infer: true }),
          };
        }

        const arquivo = config.get('DB_SQLITE_ARQUIVO', { infer: true });
        if (arquivo !== ':memory:') {
          mkdirSync(dirname(arquivo), { recursive: true });
        }
        return { ...base, type: 'better-sqlite3', database: arquivo };
      },
    }),

    // Limite geral: 100 requisições por minuto por IP
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),

    AuthModule,
    UsuariosModule,
    ProdutosModule,
    UploadsModule,
  ],
  providers: [
    // Ordem importa: limita taxa → exige token → confere papel.
    // Toda rota é protegida por padrão; as públicas usam @Publico().
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PapeisGuard },
  ],
})
export class AppModule {}
