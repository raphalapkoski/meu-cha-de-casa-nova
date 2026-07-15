import { Component } from '@angular/core';
import { ItemModal } from './item-modal';

@Component({
  selector: 'app-gestao-page',
  imports: [ItemModal],
  templateUrl: './gestao-page.html',
  styleUrl: './gestao-page.css',
})
export class GestaoPage {}
