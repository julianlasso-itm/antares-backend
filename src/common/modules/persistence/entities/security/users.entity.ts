import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Assessments } from '../assessments';
import { KnowledgeGapNotes } from '../knowledge_gaps';
import { UserPerRole } from './user-per-role.entity';

@Index('users_user_status_Idx', ['status', 'deletedAt'], {})
@Index('users_user_email_Idx', ['email'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Index('pksec_users', ['userId'], { unique: true })
@Entity('sec_users', {
  schema: 'security',
  comment: 'Usuarios del sistema ANTARES',
})
export class Users {
  @ApiProperty({
    description: 'Identificador del usuario en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'user_id',
    length: 26,
    comment: 'Identificador del usuario en el sistema',
  })
  userId: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Julian Andres Lasso Figueroa',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'user_full_name',
    length: 500,
    comment: 'Nombre completo del usuario',
  })
  name: string;

  @ApiProperty({
    description: 'Correo corporativo del usuario',
    example: 'julian.lasso@sofka.com.co',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'user_email',
    length: 500,
    comment: 'Correo electrónico del usuario en el sistema',
  })
  email: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'user_status',
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
    name: 'user_created_at',
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
    name: 'user_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @ApiProperty({
    description: 'Fecha y hora de borrado del registro',
    example: null,
    required: false,
    type: Date,
  })
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
