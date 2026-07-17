import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HlmButtonImports } from '@components/ui/button';
import { HlmDialogImports } from '@components/ui/dialog';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';
import { ConvidadoState } from '../../convidado.state';
import confetti from 'canvas-confetti';
import { HlmAlertImports } from '@components/ui/alert';

@Component({
  selector: 'app-item-convidado-list',
  imports: [HlmAlertImports, HlmButtonImports, HlmDialogImports],
  templateUrl: './item-convidado-list.html',
})
export class ItemConvidadoList {
  protected readonly convidadoState = inject(ConvidadoState);

  readonly selectedItem = signal<IGuestItem | null>(null);
  readonly dialogState = signal<'open' | 'closed'>('closed');
  readonly mensagemErro = signal<string | null>(null);

  isDisabled(status: string) {
    return status !== 'available';
  }

  onMarcarCompra(item: IGuestItem): void {
    this.selectedItem.set(item);
    this.dialogState.set('open');
  }

  confirmarCompra(): void {
    const item = this.selectedItem();
    if (!item) return;

    this.dialogState.set('closed');
    this.selectedItem.set(null);

    this.convidadoState.marcarCompra(item.id).subscribe({
      next: () => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          ticks: 250,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.mensagemErro.set(`Este item foi comprado por outro convidado!`);
        } else {
          this.mensagemErro.set('Erro ao marcar compra. Tente novamente.');
        }
        setTimeout(() => this.mensagemErro.set(null), 4000);
      },
    });
  }

  cancelarCompra(): void {
    this.dialogState.set('closed');
    this.selectedItem.set(null);
  }
}
