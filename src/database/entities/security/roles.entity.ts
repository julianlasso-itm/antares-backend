import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserPerRole } from './user-per-role.entity';

@Index('roles_role_status_Idx', ['status', 'deletedAt'], {})
@Index('pksec_roles', ['roleId'], { unique: true })
@Index('roles_role_name_Idx', ['name'], {
  unique: true,
  where: 'role_deleted_at IS NULL',
})
@Entity('sec_roles', {
  schema: 'security',
  comment: 'Roles del sistema ANTARES',
})
export class Roles {
  @Column('character varying', {
    primary: true,
    name: 'role_id',
    length: 26,
    comment: 'Identificador del rol en el sistema',
  })
  roleId: string;

  @Column('character varying', {
    name: 'role_name',
    length: 50,
    comment: 'Nombre del rol en el sistema',
  })
  name: string;

  @Column('character varying', {
    name: 'role_description',
    length: 1024,
    comment: 'Descripción del rol en el sistema',
  })
  description: string;

  @Column('boolean', {
    name: 'role_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'role_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'role_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'role_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(() => UserPerRole, (userPerRole) => userPerRole.role)
  userPerRoles: UserPerRole[];
}
