import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { KnowledgeGapNotes } from '../../../common/modules/persistence/entities';
import {
  NewKnowledgeGapNoteRequestDto,
  UpdateKnowledgeGapNoteRequestDto,
} from '../dto';
import { KnowledgeGapNotesService } from '../services/knowledge-gap-notes.service';

@Controller('knowledge-gap-notes')
export class KnowledgeGapNotesController {
  constructor(private readonly service: KnowledgeGapNotesService) {}

  @Get()
  async findAll(): Promise<ResponseDto<KnowledgeGapNotes[]>> {
    const data = await this.service.findAll();
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
