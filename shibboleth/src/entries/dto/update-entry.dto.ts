import { PartialType } from '@nestjs/mapped-types';
import { CreateEntryDto } from './create-entry.dto';
import { IsOptional, IsBase64 } from 'class-validator';

export class UpdateEntryDto extends PartialType(CreateEntryDto) {
  @IsOptional()
  @IsBase64()
  photo?: Buffer;
}
