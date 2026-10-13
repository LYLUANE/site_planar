import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Papel } from '../../usuarios/usuario.entity';
import { CHAVE_PAPEIS, RequestAutenticada } from '../decorators';

@Injectable()
export class PapeisGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const papeis = this.reflector.getAllAndOverride<Papel[] | undefined>(
      CHAVE_PAPEIS,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!papeis?.length) return true;

    const { usuario } = ctx.switchToHttp().getRequest<RequestAutenticada>();
    if (!usuario || !papeis.includes(usuario.papel)) {
      throw new ForbiddenException('Acesso restrito');
    }
    return true;
  }
}
