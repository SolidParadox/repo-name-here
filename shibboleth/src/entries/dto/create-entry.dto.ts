import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsBase64 } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  public: boolean;

  @IsString()
  link: string;
  
  @IsString()
  @IsBase64()
  photo: Buffer;
}
