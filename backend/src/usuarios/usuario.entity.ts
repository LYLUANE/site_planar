import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type Papel = 'admin' | 'cliente';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  login!: string;

  @Column({ name: 'senha_hash', length: 255, select: false })
  senhaHash!: string;

  @Column({ type: 'varchar', length: 20, default: 'cliente' })
  papel!: Papel;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;
}

export interface UsuarioPublico {
  id: number;
  login: string;
  papel: Papel;
}

export function paraUsuarioPublico({
  id,
  login,
  papel,
}: Usuario): UsuarioPublico {
  return { id, login, papel };
}
