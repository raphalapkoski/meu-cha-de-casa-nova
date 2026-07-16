import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ default: 'available' })
  status: string;
}
