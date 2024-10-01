import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RolePerProfessional } from '../projects_management';

@Index('professionals_pro_status_Idx', ['status', 'deletedAt'], {})
@Index('professionals_pro_full_name_Idx', ['name', 'deletedAt'], {})
@Index(
  'professionals_pro_document_type_pro_document_Idx',
  ['documentType', 'document'],
  { unique: true, where: 'deletedAt IS NULL' },
)
@Index('professionals_pro_email_Idx', ['email'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Index('pkhr_professionals', ['professionalId'], { unique: true })
@Entity('hr_professionals', {
  schema: 'human_resources',
  comment:
    'Datos de los profesionales de la empresa, es decir, programadores y demás',
})
export class Professionals {
  @ApiProperty({
    description: 'Identificador del profesional en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'pro_id',
    length: 26,
    comment: 'Identificador del profesional en el sistema',
  })
  professionalId: string;

  @ApiProperty({
    description: 'Tipo de documento',
    example: 'CC',
    examples: ['CC', 'CE'],
    enum: DocumentType,
    required: true,
    maxLength: 2,
    type: String,
  })
  @Column('character varying', {
    name: 'pro_document_type',
    length: 2,
    comment:
      'Tipo de documento. CC = Cédula de Ciudadanía ; CE = Cédula de Extranjería',
  })
  documentType: string;

  @ApiProperty({
    description: 'Número de documento',
    example: '123456789',
    required: true,
    maxLength: 20,
    type: String,
  })
  @Column('character varying', {
    name: 'pro_document',
    length: 20,
    comment: 'Número de documento',
  })
  document: string;

  @ApiProperty({
    description: 'Nombre completo del profesional',
    example: 'Julian Andres Lasso Figueroa',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'pro_full_name',
    length: 500,
    comment: 'Nombre completo del profesional',
  })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del profesional',
    example: 'julian.lasso@sofka.com.co',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'pro_email',
    length: 500,
    comment: 'Correo electrónico del profesional',
  })
  email: string;

  @ApiProperty({
    description: 'Foto del profesional',
    example: '/icons/100860/photo.png',
    required: false,
    maxLength: 1024,
    type: String,
  })
  @Column('character varying', {
    name: 'pro_photo',
    nullable: true,
    length: 1024,
    comment: 'Foto del profesional',
  })
  photo: string | null;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'pro_status',
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
    name: 'pro_created_at',
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
    name: 'pro_updated_at',
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
    name: 'pro_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => RolePerProfessional,
    (rolePerProfessional) => rolePerProfessional.professional,
  )
  rolePerProfessionals: RolePerProfessional[];
}
