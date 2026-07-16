import { Component, inject } from '@angular/core';
import { GestaoState } from './gestao.state';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.html',
})
export class ItemList {
  protected readonly gestaoState = inject(GestaoState);
}
