import { Injectable, inject, signal } from '@angular/core';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';
import { ConvidadoItemsService } from '../../core/services/convidado-items.service';

@Injectable()
export class ConvidadoState {
  private readonly convidadoItemsService = inject(ConvidadoItemsService);

  readonly items = signal<IGuestItem[]>([]);
  readonly loading = signal(true);

  load(): void {
    this.loading.set(true);
    this.convidadoItemsService.getAll().subscribe({
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
