import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
import { CrudController, ResponseDto } from '../../../common';
import { FindAllResponse } from '../../../common/modules/persistence';
import { Assessments } from '../../../common/modules/persistence/entities';
import { NewAssessmentsRequestDto, UpdateAssessmentsRequestDto } from '../dto';
import { AssessmentsService } from '../services';

@ApiTags('assessments')
@ApiExtraModels(ResponseDto, Assessments)
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly service: AssessmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas las evaluaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de evaluaciones del sistema',
    content: {
      'application/json': {
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                value: {
                  type: 'array',
                  items: { $ref: getSchemaPath(Assessments) },
                },
              },
            },
          ],
        },
        examples: {
          withData: {
            summary: 'Con datos',
            value: {
              value: [
                {
                  assessmentId: '01J8XM2FC49N58RTHH671GPFVV',
                  userId: '01J8XM2FC49N58RTHH671GPFVV',
                  rolePerProfessionalId: '01J8XM2FC49N58RTHH671GPFVV',
                  startDate: '2024-10-01T12:00:00.000Z',
                  status: true,
                },
              ],
            },
          },
          withoutData: {
            summary: 'Sin datos',
            value: { value: [] },
          },
        },
      },
    },
  })
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<ResponseDto<FindAllResponse<Assessments>>> {
    const data = await this.service.findAll(page, size, {
      status: 'DESC',
      createdAt: 'ASC',
    });
    return CrudController.response(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una evaluación específica' })
  @ApiParam({
    name: 'id',
    description: 'Identificador de la evaluación',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Evaluación obtenida correctamente',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ResponseDto) },
        example: {
          value: {
            assessmentId: '01J8XM2FC49N58RTHH671GPFVV',
            userId: '01J8XM2FC49N58RTHH671GPFVV',
            rolePerProfessionalId: '01J8XM2FC49N58RTHH671GPFVV',
            startDate: '2024-10-01T12:00:00.000Z',
            status: true,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Elemento no encontrado',
    content: {
      'application/json': {
        example: {
          message: 'Record not found',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<ResponseDto<Assessments>> {
    console.log('AssessmentsController.findOne');
    const data = await this.service.findOne('assessmentId', id);
    return CrudController.response(data);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva evaluación' })
  @ApiBody({
    description: 'Datos para crear una nueva evaluación',
    required: true,
    type: NewAssessmentsRequestDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Evaluación creada correctamente',
    content: {
      'application/json': {
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                value: {
                  $ref: getSchemaPath(Assessments),
                },
              },
            },
          ],
          example: {
            value: {
              assessmentId: '01J8XM2FC49N58RTHH671GPFVV',
              userId: '01J8XM2FC49N58RTHH671GPFVV',
              rolePerProfessionalId: '01J8XM2FC49N58RTHH671GPFVV',
              observations: null,
              score: 0.0,
              startDate: '2024-10-01T12:00:00.000Z',
              endDate: null,
              status: true,
              createdAt: '2023-03-30T12:00:00.000Z',
              updatedAt: null,
              deletedAt: null,
            },
          },
        },
      },
    },
  })
  async create(
    @Body() request: NewAssessmentsRequestDto,
  ): Promise<ResponseDto<Assessments>> {
    console.log('AssessmentsController.create');
    const newData = new Assessments();
    newData.assessmentId = ulid();
    newData.rolePerProfessionalId = request.rolePerProfessionalId;
    newData.userId = request.userId; // TODO: Esto debería salir del token de autenticación en relación al correo del usuario
    newData.startDate = new Date();

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una evaluación existente' })
  @ApiParam({
    name: 'id',
    description: 'Identificador de la evaluación a actualizar',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
  })
  @ApiBody({
    description: 'Datos para actualizar una evaluación',
    required: true,
    type: UpdateAssessmentsRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Evaluación actualizada correctamente',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ResponseDto) },
      },
    },
  })
  async update(
    @Body() request: UpdateAssessmentsRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Assessments>> {
    console.log('AssessmentsController.update');
    const update = new Assessments();
    if (request.observations) {
      update.observations = request.observations;
    }
    if (request.score !== undefined) {
      update.score = request.score;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('assessmentId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una evaluación existente' })
  @ApiParam({
    name: 'id',
    description: 'Identificador de la evaluación a eliminar',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Evaluación eliminada correctamente',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ResponseDto) },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Elemento no encontrado',
    content: {
      'application/json': {
        example: {
          message: 'Elemento no encontrado',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    console.log('AssessmentsController.delete');
    const data = await this.service.delete('assessmentId', id);
    return CrudController.response(data);
  }
}
