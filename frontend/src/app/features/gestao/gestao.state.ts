import { Injectable, inject, signal } from '@angular/core';
import { IItem } from '@meu-cha-de-casa-nova/shared-types';
import { ItemsService } from '../../core/services/items.service';

@Injectable()
export class GestaoState {
  private readonly itemsService = inject(ItemsService);

  readonly items = signal<IItem[]>([]);
  readonly loading = signal(true);

  load(): void {
    this.loading.set(true);
    this.itemsService.getAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
