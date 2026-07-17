import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemConvidadoList } from './item-convidado-list';
import { ConvidadoState } from '../../convidado.state';

describe('ItemConvidadoList', () => {
  let component: ItemConvidadoList;
  let fixture: ComponentFixture<ItemConvidadoList>;
  let httpMock: HttpTestingController;
  let convidadoState: ConvidadoState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemConvidadoList],
      providers: [provideHttpClient(), provideHttpClientTesting(), ConvidadoState],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemConvidadoList);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    convidadoState = TestBed.inject(ConvidadoState);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('exibe mensagem de lista vazia quando não há itens', () => {
    convidadoState.load();
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/convidado/items');
    req.flush([]);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Nenhum item disponível no momento.');
  });

  it('exibe cards com imagem e nome quando há itens', () => {
    const mockItems = [
      { id: 1, name: 'Item Um', image: 'data:image/png;base64,a' },
      { id: 2, name: 'Item Dois', image: 'data:image/png;base64,b' },
    ];

    convidadoState.load();
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/convidado/items');
    req.flush(mockItems);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Item Um');
    expect(el.textContent).toContain('Item Dois');

    const imgs = el.querySelectorAll('img');
    expect(imgs.length).toBe(2);
    expect(imgs[0].getAttribute('src')).toBe('data:image/png;base64,a');
    expect(imgs[1].getAttribute('src')).toBe('data:image/png;base64,b');
  });

  it('exibe botão Oba, comprei este! em cada card', () => {
    const mockItems = [
      { id: 1, name: 'Item Um', image: 'data:image/png;base64,a', status: 'available' },
    ];

    convidadoState.load();
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/convidado/items');
    req.flush(mockItems);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const buttons = el.querySelectorAll('button');
    expect(buttons.length).toBe(1);
    expect(buttons[0].textContent).toContain('comprei este');
  });
});
