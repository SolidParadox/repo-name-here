import { Controller, Post, Get, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { ApiKeyService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor (
    private readonly apiKeyService: ApiKeyService
  ) {}

  @Post()
  async saveAPI(@Body() createApiKeyDto: CreateApiKeyDto, @Req() req: Request, @Res() res: Response) {
    req.session.apiKey = createApiKeyDto.apiKey;
    return res.status(HttpStatus.OK).json( this.apiKeyService.isAdmin( req ) );
  }
  
  @Get()
  async getStatus( @Req() req: Request ) {
    return  this.apiKeyService.isAdmin( req );
  }
}
