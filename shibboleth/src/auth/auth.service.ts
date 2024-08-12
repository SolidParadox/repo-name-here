import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyService {  
  isAdmin(req: Request): boolean {
    return (req.session.apiKey || null) == "pass";
  }
}
