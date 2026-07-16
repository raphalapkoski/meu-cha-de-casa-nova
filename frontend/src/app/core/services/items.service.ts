import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItem } from '@meu-cha-de-casa-nova/shared-types';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<IItem[]>('/api/items');
  }
}
