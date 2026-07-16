import { Component, inject } from '@angular/core';
import { HlmButton } from '@components/ui/button';
import { ItemModal } from './item-modal';
import { ItemList } from './item-list';
import { GestaoState } from './gestao.state';

@Component({
  selector: 'app-gestao-page',
  imports: [HlmButton, ItemModal, ItemList],
  providers: [GestaoState],
  templateUrl: './gestao-page.html',
  styleUrl: './gestao-page.css',
})
export class GestaoPage {
  readonly gestaoState = inject(GestaoState);

  constructor() {
    this.gestaoState.load();
  }
}
