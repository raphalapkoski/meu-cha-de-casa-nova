import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';

@Injectable({
  providedIn: 'root',
})
export class ConvidadoItemsService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<IGuestItem[]>('/api/convidado/items');
  }
}
