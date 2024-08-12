import { Controller, Req, Res, HttpStatus, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Request, Response } from 'express';

import { ApiKeyService } from '../auth/auth.service';

@Controller('entries')
export class EntriesController {
  constructor(
    private readonly entriesService: EntriesService, 
    private readonly apiKeyService: ApiKeyService
  ) {}

  @Post()
  create(@Body(ValidationPipe) createEntryDto: CreateEntryDto, @Req() req: Request, @Res() res: Response ) {
    const isAdmin = this.apiKeyService.isAdmin(req);
    
    if (!isAdmin) {
      return res.status(HttpStatus.FORBIDDEN).json({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Access denied. Only admins can create entries.',
      });
    }
    
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const isAdmin = this.apiKeyService.isAdmin(req);
    return this.entriesService.findAll( isAdmin );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const isAdmin = this.apiKeyService.isAdmin(req);
    return this.entriesService.findOne(id, isAdmin);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEntryDto: UpdateEntryDto, @Req() req: Request, @Res() res: Response) {
    const isAdmin = this.apiKeyService.isAdmin(req);
    
    if (!isAdmin) {
      return res.status(HttpStatus.FORBIDDEN).json({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Access denied. Only admins can edit entries.',
      });
    }
    
    return res.status(HttpStatus.OK).json( this.entriesService.update(id, updateEntryDto) );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
    const isAdmin = this.apiKeyService.isAdmin(req);
    
    if (!isAdmin) {
      return res.status(HttpStatus.FORBIDDEN).json({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Access denied. Only admins can delete entries.',
      });
    }
    
    return this.entriesService.remove(id);
  }
  
  @Get(':id/photo')
  async getPhoto(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
    const photoData = await this.entriesService.getPhotoData(id);
    const isAdmin = this.apiKeyService.isAdmin(req);
    
    if (photoData && ( photoData[ 'public' ] || isAdmin ) ) {
      // Return the Base64 data directly
      res.status(HttpStatus.OK).send(photoData.data);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Photo not found');
    }
  }
}
