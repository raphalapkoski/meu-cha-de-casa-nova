import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItem, UpdateItemDto } from '@meu-cha-de-casa-nova/shared-types';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<IItem[]>('/api/items');
  }

  delete(id: number) {
    return this.http.delete<void>(`/api/items/${id}`);
  }

  update(id: number, dto: UpdateItemDto) {
    return this.http.put<IItem>(`/api/items/${id}`, dto);
  }
}
