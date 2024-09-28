import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Assessments } from '../assessments';
import { KnowledgeGapNotes } from '../knowledge_gaps';
import { UserPerRole } from './user-per-role.entity';

@Index('users_user_status_Idx', ['deletedAt', 'status'], {})
@Index('users_user_email_Idx', ['email'], { unique: true })
@Index('pksec_users', ['userId'], { unique: true })
@Entity('sec_users', { schema: 'security' })
export class Users {
  @Column('character varying', { primary: true, name: 'user_id', length: 26 })
  userId: string;

  @Column('character varying', { name: 'user_full_name', length: 500 })
  name: string;

  @Column('character varying', { name: 'user_email', length: 500 })
  email: string;

  @Column('boolean', { name: 'user_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'user_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'user_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'user_deleted_at',
    nullable: true,
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
