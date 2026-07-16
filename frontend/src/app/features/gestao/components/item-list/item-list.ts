import { Component, inject, output } from '@angular/core';
import { HlmButton } from '@components/ui/button';
import { GestaoState } from '../../gestao.state';
import { LucidePencil, LucideTrash2 } from '@lucide/angular';

@Component({
  selector: 'app-item-list',
  imports: [HlmButton, LucidePencil, LucideTrash2],
  templateUrl: './item-list.html',
})
export class ItemList {
  protected readonly gestaoState = inject(GestaoState);
}
