import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, finalize } from 'rxjs';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';
import { ConvidadoItemsService } from '../../core/services/convidado-items.service';

@Injectable()
export class ConvidadoState {
  private readonly convidadoItemsService = inject(ConvidadoItemsService);

  readonly items = signal<IGuestItem[]>([]);
  readonly loading = signal(true);
  readonly marcando = signal(false);
  readonly selectedItem = signal<IGuestItem | null>(null);
  readonly dialogState = signal<'open' | 'closed'>('closed');
  readonly mensagemErro = signal<string | null>(null);

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

  marcarCompra(id: number) {
    this.marcando.set(true);
    return this.convidadoItemsService.marcarCompra(id).pipe(
      finalize(() => {
        this.convidadoItemsService.getAll().subscribe({
          next: (data) => this.items.set(data),
        });
        this.marcando.set(false);
      }),
    );
  }

  abrirDialog(item: IGuestItem): void {
    this.selectedItem.set(item);
    this.dialogState.set('open');
  }

  fecharDialog(): void {
    this.dialogState.set('closed');
    this.selectedItem.set(null);
  }

  confirmarCompra(): Observable<IGuestItem> {
    const item = this.selectedItem();
    if (!item) return EMPTY;
    this.fecharDialog();
    return this.marcarCompra(item.id);
  }

  limparMensagem(): void {
    this.mensagemErro.set(null);
  }
}
