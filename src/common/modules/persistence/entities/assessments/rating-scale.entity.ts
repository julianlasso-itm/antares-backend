import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ConfigurationLevels } from './configuration-levels.entity';

@Index('rating_scale_cnf_lvl_id_Idx', ['configurationLevelId', 'deletedAt'], {})
@Index(
  'rating_scale_cnf_lvl_id_rc_name_Idx',
  ['configurationLevelId', 'name'],
  { unique: true, where: 'deletedAt IS NULL' },
)
@Index('rc_rc_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_rating_scale', ['ratingScaleId'], { unique: true })
@Entity('assmt_rating_scale', {
  schema: 'assessments',
  comment: 'Escala de calificación en una configuración del sistema',
})
export class RatingScale {
  @ApiProperty({
    description: 'Identificador de la escala a usar en un nivel',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'rc_id',
    length: 26,
    comment: 'Identificador de la escala a usar en un nivel',
  })
  ratingScaleId: string;

  @ApiProperty({
    description:
      'Identificador de la configuración usada con referencia a los niveles usados en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'cnf_lvl_id',
    length: 26,
    comment:
      'Identificador de la configuración usada con referencia a los niveles usados en el sistema',
  })
  configurationLevelId: string;

  @ApiProperty({
    description: 'Nombre de la escala a usar',
    example: 'No conoce',
    examples: [
      'No conoce',
      'Conoce',
      'Comprende',
      'Practica',
      'Domina',
      'Experto',
    ],
    required: true,
    maxLength: 80,
    type: String,
  })
  @Column('character varying', {
    name: 'rc_name',
    length: 80,
    comment:
      'Nombre de la escala a usar. Ejemplo: No conoce, Conoce, Comprende, Practica, Domina, Experto',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción de la escala',
    example: 'No conoce sobre el tema',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'rc_description',
    length: 500,
    comment: 'Descripción de la escala',
  })
  description: string;

  @ApiProperty({
    description: 'Valor de la escala. Acepta hasta dos decimales',
    example: 5.0,
    examples: [0.0, 1.0, 2.0, 2.5, 3.0, 4.0, 5.0],
    maximum: 5.0,
    minimum: 0.0,
    required: true,
    type: Number,
  })
  @Column('numeric', {
    name: 'rc_value',
    precision: 3,
    scale: 2,
    comment:
      'Valor de la escala 0.00 a 5.00 ; Se puede usar máximo 2 decimales',
  })
  value: number;

  @ApiProperty({
    description: 'Posición de la escala. Sólo números enteros',
    example: 1,
    examples: [1, 2, 3],
    required: true,
    type: Number,
  })
  @Column('integer', {
    name: 'rc_position',
    comment: 'Posición de la escala. Sólo números enteros',
  })
  position: number;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'rc_status',
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
    name: 'rc_created_at',
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
    name: 'rc_updated_at',
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
    name: 'rc_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => ConfigurationLevels,
    (configurationLevels) => configurationLevels.ratingScales,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'cnf_lvl_id', referencedColumnName: 'configurationLevelId' },
  ])
  configurationLevel: ConfigurationLevels;
}
