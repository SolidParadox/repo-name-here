import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsBase64 } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  public: boolean;

  @IsString()
  @IsNotEmpty()
  link: string;
  
  @IsString()
  @IsBase64()
  photo: Buffer;
}
