import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ConfigurationLevels } from './configuration-levels.entity';
import { DomainKnowledge } from './domain-knowledge.entity';
import { DomainQuestionsAnswers } from './domain-questions-answers.entity';
import { Levels } from './levels.entity';

@Index(
  'domain_knowledge_levels_dk_id_cnf_lvl_id_level_id_Idx',
  ['configurationLevelId', 'domainKnowledgeId', 'levelId'],
  {
    unique: true,
    where: 'deletedAt IS NULL',
  },
)
@Index('domain_knowledge_levels_dk_lvl_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_domain_knowledge_levels', ['domainKnowledgeLevelId'], {
  unique: true,
})
@Entity('assmt_domain_knowledge_levels', {
  schema: 'assessments',
  comment:
    'Esta tabla representa la relación condicional entre los elementos de conocimiento del dominio (`domain_knowledge`), los niveles de configuración (`configuration_levels`) y los niveles generales (`levels`). Su objetivo es garantizar que, cuando un elemento de conocimiento esté asociado a una configuración específica, también esté vinculado a un nivel determinado. Esta tabla intermedia asegura la consistencia de los datos al establecer una dependencia explícita entre configuraciones y niveles dentro del contexto del conocimiento de un dominio',
})
export class DomainKnowledgeLevels {
  @Column('character varying', {
    primary: true,
    name: 'dk_lvl_id',
    length: 26,
    comment:
      'Identificador del dominio de conocimiento pero con una configuración de nivel',
  })
  domainKnowledgeLevelId: string;

  @Column('character varying', {
    name: 'dk_id',
    length: 26,
    comment: 'Identificador del dominio de conocimiento',
  })
  domainKnowledgeId: string;

  @Column('character varying', {
    name: 'cnf_lvl_id',
    length: 26,
    comment: 'Identificador de la configuración usada',
  })
  configurationLevelId: string;

  @Column('character varying', {
    name: 'level_id',
    length: 26,
    comment:
      'Identificador del nivel en el sistema. Ejemplo: Junior, Middle o Senior',
  })
  levelId: string;

  @Column('boolean', {
    name: 'dk_lvl_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'dk_lvl_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'dk_lvl_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'dk_lvl_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => ConfigurationLevels,
    (configurationLevels) => configurationLevels.domainKnowledgeLevels,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'cnf_lvl_id', referencedColumnName: 'configurationLevelId' },
  ])
  configurationLevel: ConfigurationLevels;

  @ManyToOne(
    () => DomainKnowledge,
    (domainKnowledge) => domainKnowledge.domainKnowledgeLevels,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'dk_id', referencedColumnName: 'domainKnowledgeId' }])
  domainKnowledge: DomainKnowledge;

  @ManyToOne(() => Levels, (levels) => levels.domainKnowledgeLevels, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'level_id', referencedColumnName: 'levelId' }])
  level: Levels;

  @OneToMany(
    () => DomainQuestionsAnswers,
    (domainQuestionsAnswers) => domainQuestionsAnswers.domainKnowledgeLevel,
    { cascade: true },
  )
  domainQuestionsAnswers: DomainQuestionsAnswers[];
}
