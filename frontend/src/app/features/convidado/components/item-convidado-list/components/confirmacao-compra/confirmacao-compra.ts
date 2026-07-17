import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HlmButtonImports } from '@components/ui/button';
import { HlmDialogImports } from '@components/ui/dialog';
import { ConvidadoState } from '../../convidado.state';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-confirmacao-compra',
  imports: [HlmButtonImports, HlmDialogImports],
  templateUrl: './confirmacao-compra.html',
})
export class ConfirmacaoCompra {
  protected readonly convidadoState = inject(ConvidadoState);

  confirmarCompra(): void {
    this.convidadoState.confirmarCompra().subscribe({
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
          this.convidadoState.mensagemErro.set('Este item foi comprado por outro convidado!');
        } else {
          this.convidadoState.mensagemErro.set('Erro ao marcar compra. Tente novamente.');
        }
        setTimeout(() => this.convidadoState.limparMensagem(), 4000);
      },
    });
  }

  cancelarCompra(): void {
    this.convidadoState.fecharDialog();
  }
}
