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
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { FindAllResponse } from '../../../common/modules/persistence';
import { KnowledgeGapNotes } from '../../../common/modules/persistence/entities';
import {
  NewKnowledgeGapNoteRequestDto,
  UpdateKnowledgeGapNoteRequestDto,
} from '../dto';
import { KnowledgeGapNotesService } from '../services';

@Controller('notes')
export class KnowledgeGapNotesController {
  constructor(private readonly service: KnowledgeGapNotesService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<KnowledgeGapNotes>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['observation'],
      search,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<KnowledgeGapNotes>> {
    const data = await this.service.findOne('knowledgeGapNoteId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewKnowledgeGapNoteRequestDto,
  ): Promise<ResponseDto<KnowledgeGapNotes>> {
    const newData = new KnowledgeGapNotes();
    newData.knowledgeGapNoteId = ulid();
    newData.knowledgeGapId = request.knowledgeGapId;
    newData.userId = request.userId; // TODO: Esto debería salir del token de autenticación en relación al correo del usuario
    newData.observation = request.note;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateKnowledgeGapNoteRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<KnowledgeGapNotes>> {
    const update = new KnowledgeGapNotes();
    if (request.note) {
      update.observation = request.note;
    }

    const data = await this.service.update('knowledgeGapNoteId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('knowledgeGapNoteId', id);
    return CrudController.response(data);
  }
}
