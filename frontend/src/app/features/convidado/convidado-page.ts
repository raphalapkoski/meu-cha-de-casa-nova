import { Component, inject } from '@angular/core';
import { ConvidadoState } from './convidado.state';
import { ItemConvidadoList } from './components/item-convidado-list/item-convidado-list';

@Component({
  selector: 'app-convidado-page',
  imports: [ItemConvidadoList],
  providers: [ConvidadoState],
  templateUrl: './convidado-page.html',
})
export class ConvidadoPage {
  readonly convidadoState = inject(ConvidadoState);

  constructor() {
    this.convidadoState.load();
  }
}
