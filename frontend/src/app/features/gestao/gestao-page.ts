import { Component, inject } from '@angular/core';
import { ItemModal } from './item-modal';
import { ItemList } from './item-list';
import { GestaoState } from './gestao.state';

@Component({
  selector: 'app-gestao-page',
  imports: [ItemModal, ItemList],
  providers: [GestaoState],
  templateUrl: './gestao-page.html',
  styleUrl: './gestao-page.css',
})
export class GestaoPage {
  private readonly gestaoState = inject(GestaoState);

  constructor() {
    this.gestaoState.load();
  }
  
}
