import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';

import { AuthModule } from '../auth/auth.module';

import { Entry } from './entities/entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), AuthModule], // Import TypeOrmModule and specify the entity
  providers: [EntriesService],
  controllers: [EntriesController],
  exports: []
})
export class EntriesModule {}
