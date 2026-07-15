import { Component, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HlmButton } from '@components/ui/button';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-item-modal',
  imports: [FormsModule, HlmButton, BrnDialogImports],
  templateUrl: './item-modal.html',
  styleUrl: './item-modal.css',
})
export class ItemModal {
  private readonly http = inject(HttpClient);

  readonly name = signal('');
  readonly description = signal('');
  readonly image = signal('');
  readonly isSubmitting = signal(false);

  readonly isFormValid = computed(
    () => this.name().trim().length > 0 && this.description().trim().length > 0 && this.image().length > 0,
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
    this.http
      .post('/api/items', {
        name: this.name(),
        description: this.description(),
        image: this.image(),
      })
      .subscribe({
        next: () => {
          this.name.set('');
          this.description.set('');
          this.image.set('');
          this.isSubmitting.set(false);
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }
}
