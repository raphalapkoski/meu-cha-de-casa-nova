import { Component, inject } from '@angular/core';
import { GestaoState } from './gestao.state';
import { HlmTableImports } from '@components/ui/table';

@Component({
  selector: 'app-item-list',
  imports: [HlmTableImports],
  templateUrl: './item-list.html',
})
export class ItemList {
  protected readonly gestaoState = inject(GestaoState);
}
