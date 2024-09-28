import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { KnowledgeGaps } from '../knowledge_gaps';
import { RolePerProfessional } from '../projects_management';
import { Users } from '../security';
import { DomainAssessmentScores } from './domain-assessment-scores.entity';

@Index('assessments_rpp_id_Idx', ['deletedAt', 'rolePerProfessionalId'], {})
@Index(
  'assessments_user_id_rpp_id_Idx',
  ['deletedAt', 'rolePerProfessionalId', 'userId'],
  {},
)
@Index('assessments_user_id_Idx', ['deletedAt', 'userId'], {})
@Index('assessments_asmt_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_assessments', ['assessmentId'], { unique: true })
@Entity('assmt_assessments', { schema: 'assessments' })
export class Assessments {
  @Column('character varying', { primary: true, name: 'asmt_id', length: 26 })
  assessmentId: string;

  @Column('character varying', { name: 'rpp_id', length: 26 })
  rolePerProfessionalId: string;

  @Column('character varying', { name: 'user_id', length: 26 })
  userId: string;

  @Column('character varying', {
    name: 'asmt_observations',
    nullable: true,
    length: 8192,
  })
  observations: string | null;

  @Column('numeric', {
    name: 'asmt_score',
    precision: 3,
    scale: 2,
    default: () => '0.00',
  })
  score: number;

  @Column('timestamp without time zone', { name: 'asmt_start_date' })
  startDate: Date;

  @Column('timestamp without time zone', {
    name: 'asmt_end_date',
    nullable: true,
  })
  endDate: Date | null;

  @Column('boolean', { name: 'asmt_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'asmt_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'asmt_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'asmt_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => RolePerProfessional,
    (rolePerProfessional) => rolePerProfessional.assessments,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'rpp_id', referencedColumnName: 'rolePerProfessionalId' },
  ])
  rolePerProfessional: RolePerProfessional;

  @ManyToOne(() => Users, (users) => users.assessments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Users;

  @OneToMany(
    () => DomainAssessmentScores,
    (domainAssessmentScores) => domainAssessmentScores.assessment,
  )
  domainAssessmentScores: DomainAssessmentScores[];

  @OneToMany(() => KnowledgeGaps, (knowledgeGaps) => knowledgeGaps.assessment)
  knowledgeGaps: KnowledgeGaps[];
}
