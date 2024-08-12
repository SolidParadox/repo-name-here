import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

  
interface PhotoData {
  'public': boolean;
  data: string; // Base64 data URL
};

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepo: Repository<Entry>
  ) {}

  async findAll(isAdmin: boolean): Promise<Entry[]> {    
    if (isAdmin) {
      return this.entryRepo.find();
    } else {
      return this.entryRepo.find( { where: { public: true } });
    }
  }

  async findOne(id: number, isAdmin: boolean): Promise<Entry> {
    const entry = await this.entryRepo.createQueryBuilder('entry')
      .where('entry.id = :id', { id })
      .andWhere(isAdmin ? '1=1' : 'entry.public = :public', { public: true })
      .getOne();

    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }

    return entry;
  } 

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const newEntry = this.entryRepo.create({
      name: createEntryDto.name,
      description: createEntryDto.description,
      public: createEntryDto.public,
      link: createEntryDto.link,
      photo: createEntryDto.photo, // Save Base64 string directly
    });

    return this.entryRepo.save(newEntry);
  }

  async update(id: number, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    const entry = await this.findOne(id, true);
    
    if (updateEntryDto.photo) {
      entry.photo = updateEntryDto.photo; // Directly update with Base64 string
    }

    Object.assign(entry, updateEntryDto);

    return this.entryRepo.save(entry);
  }

  async remove(id: number): Promise<void> {
    const result = await this.entryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }
  }

  async getPhotoData(id: number): Promise<PhotoData> {
    const entry = await this.findOne(id, true);
    if (entry && entry.photo) {
      return { 'public' : entry.public, data: `data:image/jpeg;base64,${entry.photo}` }; // Return Base64 data URL
    }
    return null;
  }
}
