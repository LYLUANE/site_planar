import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { conferirSenha, gerarHashSenha } from '../usuarios/senha';
import { paraUsuarioPublico } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // Hash "falso" usado quando o login não existe, para a resposta demorar o
  // mesmo tempo e não revelar quais logins estão cadastrados
  private readonly hashFalso = gerarHashSenha('senha-que-nunca-confere');

  constructor(
    private readonly usuarios: UsuariosService,
    private readonly jwt: JwtService,
  ) {}

  async login({ login, senha }: LoginDto) {
    const usuario = await this.usuarios.buscarComSenha(login);
    const senhaOk = await conferirSenha(
      senha,
      usuario?.senhaHash ?? (await this.hashFalso),
    );

    if (!usuario || !senhaOk) {
      // mesma mensagem para login e senha errados
      throw new UnauthorizedException('Login ou senha incorretos');
    }

    // O token carrega só o id; papel e dados são lidos do banco a cada requisição
    const accessToken = await this.jwt.signAsync({ sub: usuario.id });
    return { accessToken, usuario: paraUsuarioPublico(usuario) };
  }
}
