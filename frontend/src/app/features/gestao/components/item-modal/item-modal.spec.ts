import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemModal } from './item-modal';
import { GestaoState } from '../../gestao.state';
import { IItem, ItemStatus } from '@meu-cha-de-casa-nova/shared-types';

describe('ItemModal', () => {
  let component: ItemModal;
  let fixture: ComponentFixture<ItemModal>;
  let httpMock: HttpTestingController;
  let gestaoState: GestaoState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemModal],
      providers: [provideHttpClient(), provideHttpClientTesting(), GestaoState],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemModal);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    gestaoState = TestBed.inject(GestaoState);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ter estado inicial dos signals no modo criar', () => {
    expect(component.name()).toBe('');
    expect(component.image()).toBe('');
    expect(component.isFormValid()).toBe(false);
    expect(component.isSubmitting()).toBe(false);
    expect(component.isEditing).toBeFalsy();
  });

  it('preencher name e image torna isFormValid true', () => {
    component.name.set('Item Teste');
    component.image.set('data:image/png;base64,abc123');
    fixture.detectChanges();

    expect(component.isFormValid()).toBe(true);
  });

  it('submit com dados válidos envia POST e recarrega lista', () => {
    const loadSpy = vi.spyOn(gestaoState, 'load').mockImplementation(() => {});

    component.name.set('Item Teste');
    component.image.set('data:image/png;base64,abc123');
    fixture.detectChanges();

    component.onSubmit();

    const req = httpMock.expectOne('/api/items');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Item Teste',
      image: 'data:image/png;base64,abc123',
    });

    req.flush({ id: 1, name: 'Item Teste', image: 'data:image/png;base64,abc123', status: 'available' });

    expect(component.isSubmitting()).toBe(false);
    expect(loadSpy).toHaveBeenCalled();
  });

  it('submit em modo edição envia PUT', () => {
    const loadSpy = vi.spyOn(gestaoState, 'load').mockImplementation(() => {});

    const item: IItem = { id: 5, name: 'Original', image: 'data:image/png;base64,old', status: ItemStatus.available };
    gestaoState.onOpenDialogEdit(item);
    fixture.detectChanges();

    expect(component.name()).toBe('Original');
    expect(component.image()).toBe('data:image/png;base64,old');
    expect(component.isEditing).toBeTruthy();

    component.name.set('Atualizado');
    component.image.set('data:image/png;base64,new');
    fixture.detectChanges();

    component.onSubmit();

    const req = httpMock.expectOne('/api/items/5');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      name: 'Atualizado',
      image: 'data:image/png;base64,new',
    });

    req.flush({ id: 5, name: 'Atualizado', image: 'data:image/png;base64,new', status: 'available' });

    expect(component.isSubmitting()).toBe(false);
    expect(loadSpy).toHaveBeenCalled();
  });
});
