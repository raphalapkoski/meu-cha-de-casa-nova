export enum ItemStatus {
  available = 'available',
  unavailable = 'unavailable',
}

export interface IItem {
  id: number;
  name: string;
  image: string;
  status: ItemStatus;
}

export type CreateItemDto = {
  name: string;
  image: string;
};
