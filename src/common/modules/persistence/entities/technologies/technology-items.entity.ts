import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DomainKnowledge } from '../assessments';
import { TechnologyStack } from '../projects_management';
import { TechnologyTypes } from './technology-types.entity';

@Index('technology_items_tech_item_status_Idx', ['status', 'deletedAt'], {})
@Index('tech_technology_items_tech_type_id_Idx', ['technologyTypeId'], {})
@Index('pktech_technology_items', ['technologyItemId'], { unique: true })
@Index('technologies_tech_name_tech_deleted_at_Idx', ['name'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Entity('tech_technology_items', {
  schema: 'technologies',
  comment: 'Tecnologías usadas en los diferentes clientes de la empresa',
})
export class TechnologyItems {
  @ApiProperty({
    description: 'Identificador de la tecnología',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'tech_item_id',
    length: 26,
    comment: 'Identificador de la tecnología',
  })
  technologyItemId: string;

  @ApiProperty({
    description: 'Identificador del tipo de tecnología',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    name: 'tech_type_id',
    length: 26,
    comment: 'Identificador del tipo de tecnología',
  })
  technologyTypeId: string;

  @ApiProperty({
    description: 'Nombre de la tecnología',
    example: 'Lenguaje de programación',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'tech_item_name',
    length: 500,
    comment: 'Nombre de la tecnología',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción de la tecnología',
    example: 'Lenguaje de programación de código abierto',
    required: false,
    maxLength: 2048,
    type: String,
  })
  @Column('character varying', {
    name: 'tech_item_description',
    nullable: true,
    length: 2048,
    comment: 'Descripción de la tecnología',
  })
  description: string | null;

  @ApiProperty({
    description: 'Ícono de la tecnología',
    example: '/icons/100860/react_icon.png',
    required: false,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'tech_item_icon',
    nullable: true,
    length: 500,
    comment: 'Ícono de la tecnología',
  })
  icon: string | null;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'tech_item_status',
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
    name: 'tech_item_created_at',
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
    name: 'tech_item_updated_at',
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
    name: 'tech_item_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => DomainKnowledge,
    (domainKnowledge) => domainKnowledge.technologyItem,
  )
  domainKnowledges: DomainKnowledge[];

  @OneToMany(
    () => TechnologyStack,
    (technologyStack) => technologyStack.technologyItem,
  )
  technologyStacks: TechnologyStack[];

  @ManyToOne(
    () => TechnologyTypes,
    (technologyTypes) => technologyTypes.technologyItems,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'tech_type_id', referencedColumnName: 'technologyTypeId' },
  ])
  technologyType: TechnologyTypes;
}
