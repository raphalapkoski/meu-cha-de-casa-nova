import { Component, inject } from '@angular/core';
import { HlmButtonImports } from '@components/ui/button';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';
import { ConvidadoState } from '../../convidado.state';
import { HlmAlertImports } from '@components/ui/alert';
import { ConfirmacaoCompra } from './components/confirmacao-compra/confirmacao-compra';

@Component({
  selector: 'app-item-convidado-list',
  imports: [HlmAlertImports, HlmButtonImports, ConfirmacaoCompra],
  templateUrl: './item-convidado-list.html',
})
export class ItemConvidadoList {
  protected readonly convidadoState = inject(ConvidadoState);

  onMarcarCompra(item: IGuestItem): void {
    this.convidadoState.abrirDialog(item);
  }
}
