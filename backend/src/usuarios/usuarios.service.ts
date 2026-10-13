import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { gerarHashSenha } from './senha';
import { Papel, Usuario } from './usuario.entity';

// Todas as consultas passam pelo Repository do TypeORM, que usa parâmetros
// (prepared statements) — não há SQL montado com concatenação de texto.
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarios: Repository<Usuario>,
  ) {}

  buscarPorId(id: number) {
    return this.usuarios.findOneBy({ id });
  }

  // Única consulta que traz o hash, usada só no login
  buscarComSenha(login: string) {
    return this.usuarios
      .createQueryBuilder('u')
      .addSelect('u.senhaHash')
      .where('u.login = :login', { login })
      .getOne();
  }

  async criar(login: string, senha: string, papel: Papel) {
    if (await this.usuarios.existsBy({ login })) {
      throw new ConflictException('Login já cadastrado');
    }
    const usuario = this.usuarios.create({
      login,
      senhaHash: await gerarHashSenha(senha),
      papel,
    });
    return this.usuarios.save(usuario);
  }

  async atualizarSenha(id: number, senha: string) {
    await this.usuarios.update(id, { senhaHash: await gerarHashSenha(senha) });
  }
}
