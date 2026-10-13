import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { paraUsuarioPublico } from '../../usuarios/usuario.entity';
import { CHAVE_PUBLICO, RequestAutenticada } from '../decorators';

interface PayloadJwt {
  sub: number;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    private readonly usuarios: UsuariosService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const publico = this.reflector.getAllAndOverride<boolean>(CHAVE_PUBLICO, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (publico) return true;

    const request = ctx.switchToHttp().getRequest<RequestAutenticada>();
    const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
    if (tipo !== 'Bearer' || !token) {
      throw new UnauthorizedException('Faça login para continuar');
    }

    let payload: PayloadJwt;
    try {
      payload = await this.jwt.verifyAsync<PayloadJwt>(token, {
        algorithms: ['HS256'],
      });
    } catch {
      throw new UnauthorizedException('Sessão inválida ou expirada');
    }

    const usuario = await this.usuarios.buscarPorId(Number(payload.sub));
    if (!usuario)
      throw new UnauthorizedException('Sessão inválida ou expirada');

    request.usuario = paraUsuarioPublico(usuario);
    return true;
  }
}
