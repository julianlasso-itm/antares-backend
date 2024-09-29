import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ulid } from 'ulid';
import {
  CrudController,
  DocumentBadRequestArrayException,
  DocumentBadRequestStringException,
  fullExamples,
  ResponseDto,
  stringExample,
} from '../../../common';
import { Roles } from '../../../common/modules/persistence/entities/security';
import { NewRoleDto } from '../dto/new-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RolesService } from '../services';

@ApiTags('security')
@ApiExtraModels(
  Roles,
  ResponseDto,
  DocumentBadRequestArrayException,
  DocumentBadRequestStringException,
)
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los roles del sistema' })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles del sistema',
    content: {
      'application/json': {
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                value: {
                  type: 'array',
                  items: { $ref: getSchemaPath(Roles) },
                },
              },
            },
          ],
        },
        examples: {
          withData: {
            summary: 'Salida con datos',
            value: {
              value: [
                {
                  roleId: '01J8XM2FC49N58RTHH671GPFVV',
                  name: 'Administrador',
                  description: null,
                  status: true,
                  createdAt: '2023-03-30T12:00:00.000Z',
                  updatedAt: null,
                  deletedAt: null,
                },
              ],
            },
          },
          withoutData: {
            summary: 'Salida sin datos',
            value: { value: [] },
          },
        },
      },
    },
  })
  async findAll(): Promise<ResponseDto<Roles[]>> {
    const data = await this.service.findAll();
    return CrudController.response(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Devuelve un rol del sistema' })
  @ApiParam({
    name: 'id',
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Rol del sistema',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            value: {
              $ref: getSchemaPath(Roles),
            },
          },
        },
      ],
    },
    example: {
      value: {
        roleId: '01J8XM2FC49N58RTHH671GPFVV',
        name: 'Administrador',
        description: null,
        status: true,
        createdAt: '2023-03-30T12:00:00.000Z',
        updatedAt: null,
        deletedAt: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Elemento no encontrado',
    schema: {
      allOf: [{ $ref: getSchemaPath(DocumentBadRequestStringException) }],
    },
    example: {
      message: 'Element not found',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  async findOne(@Param('id') id: string): Promise<ResponseDto<Roles>> {
    const data = await this.service.findOne('roleId', id);
    return CrudController.response(data);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo rol en el sistema' })
  @ApiBody({ type: NewRoleDto })
  @ApiResponse({
    status: 201,
    description: 'Rol creado',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            value: {
              $ref: getSchemaPath(Roles),
            },
          },
        },
      ],
      example: {
        value: {
          roleId: '01J8XM2FC49N58RTHH671GPFVV',
          name: 'Administrador',
          description: null,
          status: true,
          createdAt: '2023-03-30T12:00:00.000Z',
          updatedAt: null,
          deletedAt: null,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos de entrada',
    content: {
      'application/json': {
        schema: {
          oneOf: [
            { $ref: getSchemaPath(DocumentBadRequestArrayException) },
            { $ref: getSchemaPath(DocumentBadRequestStringException) },
          ],
        },
        examples: fullExamples,
      },
    },
  })
  async create(@Body() request: NewRoleDto): Promise<ResponseDto<Roles>> {
    const newData = new Roles();
    newData.roleId = ulid();
    newData.name = request.name;
    newData.description = request.description;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un rol en el sistema' })
  @ApiParam({
    name: 'id',
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    type: String,
  })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({
    status: 200,
    description: 'Rol actualizado',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            value: {
              $ref: getSchemaPath(Roles),
            },
          },
        },
      ],
      example: {
        value: {
          roleId: '01J8XM2FC49N58RTHH671GPFVV',
          name: 'Administrador',
          description: null,
          status: true,
          createdAt: '2023-03-30T12:00:00.000Z',
          updatedAt: '2023-03-30T12:00:00.000Z',
          deletedAt: null,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos de entrada',
    content: {
      'application/json': {
        schema: {
          oneOf: [
            { $ref: getSchemaPath(DocumentBadRequestArrayException) },
            { $ref: getSchemaPath(DocumentBadRequestStringException) },
          ],
        },
        examples: fullExamples,
      },
    },
  })
  async update(
    @Body() request: UpdateRoleDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Roles>> {
    const update = new Roles();
    if (request.name) {
      update.name = request.name;
    }
    if (request.description) {
      update.description = request.description;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('roleId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Rol eliminado',
    schema: {
      allOf: [{ $ref: getSchemaPath(ResponseDto) }, { type: 'boolean' }],
      example: {
        value: true,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos de entrada',
    content: {
      'application/json': {
        schema: {
          oneOf: [{ $ref: getSchemaPath(DocumentBadRequestStringException) }],
        },
        example: stringExample.value,
      },
    },
  })
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('roleId', id);
    return CrudController.response(data);
  }
}
