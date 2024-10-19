import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Assessments } from '../assessments/assessments.entity';
import { KnowledgeGapNotes } from '../knowledge_gaps/knowledge-gap-notes.entity';
import { UserPerRole } from './user-per-role.entity';

@Index('users_user_status_Idx', ['status', 'deletedAt'], {})
@Index('users_user_email_Idx', ['email'], {
  unique: true,
  where: 'user_deleted_at IS NULL',
})
@Index('pksec_users', ['userId'], { unique: true })
@Entity('sec_users', {
  schema: 'security',
  comment: 'Usuarios del sistema ANTARES',
})
export class Users {
  @Column('character varying', {
    primary: true,
    name: 'user_id',
    length: 26,
    comment: 'Identificador del usuario en el sistema',
  })
  userId: string;

  @Column('character varying', {
    name: 'user_full_name',
    length: 500,
    comment: 'Nombre completo del usuario',
  })
  name: string;

  @Column('character varying', {
    name: 'user_email',
    length: 500,
    comment: 'Correo electrónico del usuario en el sistema',
  })
  email: string;

  @Column('boolean', {
    name: 'user_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'user_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'user_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'user_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(() => Assessments, (assessments) => assessments.user)
  assessments: Assessments[];

  @OneToMany(
    () => KnowledgeGapNotes,
    (knowledgeGapNotes) => knowledgeGapNotes.user,
  )
  knowledgeGapNotes: KnowledgeGapNotes[];

  @OneToMany(() => UserPerRole, (userPerRole) => userPerRole.user)
  userPerRoles: UserPerRole[];
}
