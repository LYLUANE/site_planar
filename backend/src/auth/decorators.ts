import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import type { Request } from 'express';
import type { Papel, UsuarioPublico } from '../usuarios/usuario.entity';

export const CHAVE_PUBLICO = 'publico';
export const CHAVE_PAPEIS = 'papeis';

export const Publico = () => SetMetadata(CHAVE_PUBLICO, true);

export const Papeis = (...papeis: Papel[]) => SetMetadata(CHAVE_PAPEIS, papeis);

export interface RequestAutenticada extends Request {
  usuario?: UsuarioPublico;
}

export const UsuarioAtual = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest<RequestAutenticada>().usuario,
);
