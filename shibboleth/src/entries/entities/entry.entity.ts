import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;
  
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean' })
  public: boolean;

  @Column({ type: 'text' })
  link: string;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer; // `Buffer` type for binary data
}
