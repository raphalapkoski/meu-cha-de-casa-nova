import { Component, inject } from '@angular/core';
import { HlmButton } from '@components/ui/button';
import { GestaoState } from './gestao.state';
import { ItemList } from './components/item-list/item-list';
import { ItemModal } from './components/item-modal/item-modal';

@Component({
  selector: 'app-gestao-page',
  imports: [HlmButton, ItemModal, ItemList],
  providers: [GestaoState],
  templateUrl: './gestao-page.html',
})
export class GestaoPage {
  readonly gestaoState = inject(GestaoState);

  constructor() {
    this.gestaoState.load();
  }
}
