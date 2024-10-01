import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { TechnologyItems } from './technology-items.entity';

@Index('technology_types_tech_type_status_Idx', ['status', 'deletedAt'], {})
@Index('pktech_technology_types', ['technologyTypeId'], { unique: true })
@Index('technology_types_tech_type_name_Idx', ['name'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Entity('tech_technology_types', {
  schema: 'technologies',
  comment: 'Tipos de tecnologías',
})
export class TechnologyTypes {
  @ApiProperty({
    description: 'Identificador del tipo de tecnología',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'tech_type_id',
    length: 26,
    comment: 'Identificador del tipo de tecnología',
  })
  technologyTypeId: string;

  @ApiProperty({
    description: 'Nombre del tipo de tecnología',
    example: 'Lenguaje de programación',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'tech_type_name',
    length: 500,
    comment: 'Nombre del tipo de tecnología',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del tipo de tecnología',
    example: 'Lenguaje de programación para el desarrollo de aplicaciones',
    required: false,
    maxLength: 2048,
    type: String,
  })
  @Column('character varying', {
    name: 'tech_type_description',
    nullable: true,
    length: 2048,
    comment: 'Descripción del tipo de tecnología',
  })
  description: string | null;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'tech_type_status',
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
    name: 'tech_type_created_at',
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
    name: 'tech_type_updated_at',
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
    name: 'tech_type_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => TechnologyItems,
    (technologyItems) => technologyItems.technologyType,
  )
  technologyItems: TechnologyItems[];
}
