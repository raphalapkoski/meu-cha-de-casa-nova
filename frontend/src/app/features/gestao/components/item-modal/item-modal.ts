import { Component, inject, linkedSignal, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@components/ui/button';
import { HlmDialogImports } from '@components/ui/dialog'
import { UpdateItemDto } from '@meu-cha-de-casa-nova/shared-types';
import { GestaoState } from '../../gestao.state';

@Component({
  selector: 'app-item-modal',
  imports: [FormsModule, HlmButtonImports, HlmDialogImports],
  templateUrl: './item-modal.html',
})
export class ItemModal {
  private readonly http = inject(HttpClient);
  protected readonly gestaoState = inject(GestaoState);

  readonly name = linkedSignal(() => this.gestaoState.editingItem()?.name ?? '');
  readonly image = linkedSignal(() => this.gestaoState.editingItem()?.image ?? '');
  readonly isSubmitting = signal(false);

  readonly isFormValid = computed(
    () => this.name().trim().length > 0 && this.image().length > 0,
  );

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.image.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.isSubmitting.set(true);
    const dto: UpdateItemDto = {
      name: this.name(),
      image: this.image(),
    };

    const request = this.isEditing
      ? this.http.put(`/api/items/${this.gestaoState.editingItem()!.id}`, dto)
      : this.http.post('/api/items', dto);

    request.subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.gestaoState.load();
        this.gestaoState.dialogState.set('closed')
        this.name.set('')
        this.image.set('')
      },
      error: () => {
        this.isSubmitting.set(false);
      },
    });
  }

  get isEditing(){
    return this.gestaoState.editingItem()
  }
}
