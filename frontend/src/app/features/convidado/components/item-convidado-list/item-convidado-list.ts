import { HlmButtonImports } from './../../../../shared/components/ui/button/src/index';
import { Component, inject } from '@angular/core';
import { ConvidadoState } from '../../convidado.state';

@Component({
  selector: 'app-item-convidado-list',
  imports: [HlmButtonImports],
  templateUrl: './item-convidado-list.html',
})
export class ItemConvidadoList {
  protected readonly convidadoState = inject(ConvidadoState);

  isDisabled(status: string) {
    return status !== 'available';
  }
}
