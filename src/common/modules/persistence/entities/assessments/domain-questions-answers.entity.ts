import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';
import { DomainKnowledge } from './domain-knowledge.entity';

@Index(
  'domain_questions_answers_dk_id_Idx',
  ['domainKnowledgeId', 'deletedAt'],
  {
    where: 'domainKnowledgeLevelId IS NULL',
  },
)
@Index(
  'domain_questions_answers_dk_lvl_id_Idx',
  ['domainKnowledgeLevelId', 'deletedAt'],
  {
    where: 'domainKnowledgeId IS NULL',
  },
)
@Index('dqa_dqa_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_domain_questions_answers', ['domainQuestionAnswerId'], {
  unique: true,
})
@Entity('assmt_domain_questions_answers', {
  schema: 'assessments',
  comment: 'Preguntas y respuestas para guiar al experto en su evaluación',
})
export class DomainQuestionsAnswers {
  @ApiProperty({
    description: 'Identificador de la pregunta del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'dqa_id',
    length: 26,
    comment: 'Identificador de la pregunta del dominio de conocimiento',
  })
  domainQuestionAnswerId: string;

  @ApiProperty({
    description: 'Identificador del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'dk_id',
    nullable: true,
    length: 26,
    comment: 'Identificador del dominio de conocimiento',
  })
  domainKnowledgeId: string | null;

  @ApiProperty({
    description:
      'Identificador del dominio de conocimiento pero con una configuración de nivel',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'dk_lvl_id',
    nullable: true,
    length: 26,
    comment:
      'Identificador del dominio de conocimiento pero con una configuración de nivel',
  })
  domainKnowledgeLevelId: string | null;

  @ApiProperty({
    description: 'Pregunta a realizar bajo un dominio de conocimiento',
    example: '¿Cuál es el lenguaje de programación más popular?',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'dqa_question',
    length: 500,
    comment:
      'Pregunta a realizar bajo un dominio de conocimiento en una tecnología',
  })
  question: string;

  @ApiProperty({
    description: 'Posible respuesta a recibir bajo un dominio de conocimiento',
    example: 'Sin duda, PHP es un lenguaje de programación más popular',
    required: true,
    maxLength: 8192,
    type: String,
  })
  @Column('character varying', {
    name: 'dqa_answer',
    length: 8192,
    comment:
      'Posible respuesta a recibir bajo un dominio de conocimiento en una tecnología. La respuesta del profesional no debe ser exacta',
  })
  answer: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'dqa_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @ApiProperty({
    description: 'Fecha y hora de creación del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: true,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'dqa_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha y hora de última actualización del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'dqa_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @ApiProperty({
    description: 'Fecha y hora de borrado del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'dqa_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => DomainKnowledge,
    (domainKnowledge) => domainKnowledge.domainQuestionsAnswers,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'dk_id', referencedColumnName: 'domainKnowledgeId' }])
  domainKnowledge: DomainKnowledge;

  @ManyToOne(
    () => DomainKnowledgeLevels,
    (domainKnowledgeLevels) => domainKnowledgeLevels.domainQuestionsAnswers,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'dk_lvl_id', referencedColumnName: 'domainKnowledgeLevelId' },
  ])
  domainKnowledgeLevel: DomainKnowledgeLevels;
}
