import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Roles } from './roles.entity';
import { Users } from './users.entity';

@Index('user_per_role_user_id_role_id_Idx', ['roleId', 'userId'], {
  unique: true,
})
@Index('user_per_role_upr_status_Idx', ['deletedAt', 'status'], {})
@Index('pksec_user_per_role', ['userPerRoleId'], { unique: true })
@Entity('sec_user_per_role', { schema: 'security' })
export class UserPerRole {
  @Column('character varying', { primary: true, name: 'upr_id', length: 26 })
  userPerRoleId: string;

  @Column('character varying', { name: 'user_id', length: 26 })
  userId: string;

  @Column('character varying', { name: 'role_id', length: 26 })
  roleId: string;

  @Column('boolean', { name: 'upr_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'upr_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'upr_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'upr_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(() => Roles, (roles) => roles.userPerRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.userPerRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Users;
}
