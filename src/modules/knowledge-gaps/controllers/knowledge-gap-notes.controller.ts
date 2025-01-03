import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { KnowledgeGapNotes } from '@entities/knowledge-gaps/knowledge-gap-notes.entity';
import { NewKnowledgeGapNoteRequestDto } from '@knowledge-gaps/dto/new-knowledge-gap-note-request.dto';
import { UpdateKnowledgeGapNoteRequestDto } from '@knowledge-gaps/dto/update-knowledge-gap-note-request.dto';
import { KnowledgeGapNotesService } from '@knowledge-gaps/services/knowledge-gap-notes.service';
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
import { FindAllResponse } from '@repositories/find-all.response';
import { ulid } from 'ulid';

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
    newData.userId = '01JB5XD7GCJW96XE1YV6V7BVJD'; // TODO: Esto debería salir del token de autenticación en relación al correo del usuario
    newData.observation = request.observation;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateKnowledgeGapNoteRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<KnowledgeGapNotes>> {
    const update = new KnowledgeGapNotes();
    if (request.observation) {
      update.observation = request.observation;
    }
    if (request.status !== undefined) {
      update.status = request.status;
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
