import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ConfigurationPerLevel } from './configuration-per-level.entity';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';

@Index('levels_level_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_levels', ['levelId'], { unique: true })
@Index('levels_level_name_at_Idx', ['name'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Entity('assmt_levels', {
  schema: 'assessments',
  comment: 'Niveles a usar en el sistema. Ejemplo: Junior, Middle y Senior',
})
export class Levels {
  @ApiProperty({
    description: 'Identificador del nivel a usar en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'level_id',
    length: 26,
    comment:
      'Identificador del nivel a usar en el sistema. Ejemplo: Junior, Middle o Senior',
  })
  levelId: string;

  @ApiProperty({
    description: 'Nombre del nivel a usar',
    example: 'Junior',
    examples: ['Junior', 'Middle', 'Senior'],
    required: true,
    maxLength: 30,
    type: String,
  })
  @Column('character varying', {
    name: 'level_name',
    length: 30,
    comment: 'Nombre del nivel a usar. Ejemplo: Junior, Middle, Senior',
  })
  name: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'level_status',
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
    name: 'level_created_at',
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
    name: 'level_updated_at',
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
    name: 'level_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => ConfigurationPerLevel,
    (configurationPerLevel) => configurationPerLevel.level,
  )
  configurationPerLevels: ConfigurationPerLevel[];

  @OneToMany(
    () => DomainKnowledgeLevels,
    (domainKnowledgeLevels) => domainKnowledgeLevels.level,
  )
  domainKnowledgeLevels: DomainKnowledgeLevels[];
}
