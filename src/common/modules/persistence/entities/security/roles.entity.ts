import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserPerRole } from './user-per-role.entity';

@Index('roles_role_status_Idx', ['deletedAt', 'status'], {})
@Index('pksec_roles', ['roleId'], { unique: true })
@Index('roles_role_name_Idx', ['name'], { unique: true })
@Entity('sec_roles', { schema: 'security' })
export class Roles {
  @Column('character varying', { primary: true, name: 'role_id', length: 26 })
  roleId: string;

  @Column('character varying', { name: 'role_name', length: 50 })
  name: string;

  @Column('character varying', { name: 'role_description', length: 1024 })
  description: string;

  @Column('boolean', { name: 'role_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'role_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'role_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'role_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => UserPerRole, (userPerRole) => userPerRole.role)
  userPerRoles: UserPerRole[];
}
