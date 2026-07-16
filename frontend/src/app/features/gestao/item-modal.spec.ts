import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemModal } from './item-modal';
import { GestaoState } from './gestao.state';

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

  it('deve ter estado inicial dos signals', () => {
    expect(component.name()).toBe('');
    expect(component.image()).toBe('');
    expect(component.isFormValid()).toBe(false);
    expect(component.isSubmitting()).toBe(false);
  });

  it('preencher name e image torna isFormValid true', () => {
    component.name.set('Item Teste');
    component.image.set('data:image/png;base64,abc123');
    fixture.detectChanges();

    expect(component.isFormValid()).toBe(true);
  });

  it('submit com dados válidos chama HttpClient e recarrega lista', () => {
    const loadSpy = vi.spyOn(gestaoState, 'load').mockImplementation(() => {});

    component.name.set('Item Teste');
    component.image.set('data:image/png;base64,abc123');
    fixture.detectChanges();

    component.onSubmit({ close: () => {} });

    const req = httpMock.expectOne('/api/items');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Item Teste',
      image: 'data:image/png;base64,abc123',
    });

    req.flush({ id: 1, name: 'Item Teste', image: 'data:image/png;base64,abc123', status: 'available' });

    expect(component.isSubmitting()).toBe(false);
    expect(component.name()).toBe('');
    expect(component.image()).toBe('');
    expect(loadSpy).toHaveBeenCalled();
  });
});
