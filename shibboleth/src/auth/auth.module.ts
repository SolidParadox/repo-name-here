import { Module } from '@nestjs/common';
import { ApiKeyService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [ApiKeyService],
  exports: [ApiKeyService]
})
export class AuthModule {}
