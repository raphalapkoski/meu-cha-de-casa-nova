export interface IItem {
  id: number;
  name: string;
  description: string;
  image: string;
  status: 'available' | 'unavailable';
}

export type CreateItemDto = Pick<IItem, 'name' | 'description' | 'image'>;
