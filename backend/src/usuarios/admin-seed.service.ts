import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VariaveisAmbiente } from '../config/env.validation';
import { conferirSenha } from './senha';
import { UsuariosService } from './usuarios.service';

// Garante que o admin definido no .env exista ao subir a API.
// Se a ADMIN_SENHA do .env mudar, a senha no banco é atualizada no próximo boot.
@Injectable()
export class AdminSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    private readonly usuarios: UsuariosService,
    private readonly config: ConfigService<VariaveisAmbiente, true>,
  ) {}

  async onApplicationBootstrap() {
    const login = this.config.get('ADMIN_LOGIN', { infer: true });
    const senha = this.config.get('ADMIN_SENHA', { infer: true });

    const existente = await this.usuarios.buscarComSenha(login);
    if (!existente) {
      await this.usuarios.criar(login, senha, 'admin');
      this.logger.log(`Administrador "${login}" criado`);
      return;
    }

    if (!(await conferirSenha(senha, existente.senhaHash))) {
      await this.usuarios.atualizarSenha(existente.id, senha);
      this.logger.log(`Senha do administrador "${login}" atualizada`);
    }
  }
}
