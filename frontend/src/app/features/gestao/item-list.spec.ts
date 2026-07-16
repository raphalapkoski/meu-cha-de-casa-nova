import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemList } from './item-list';
import { GestaoState } from './gestao.state';
import { IItem, ItemStatus } from '@meu-cha-de-casa-nova/shared-types';

describe('ItemList', () => {
  let component: ItemList;
  let fixture: ComponentFixture<ItemList>;
  let httpMock: HttpTestingController;
  let gestaoState: GestaoState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemList],
      providers: [provideHttpClient(), provideHttpClientTesting(), GestaoState],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemList);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    gestaoState = TestBed.inject(GestaoState);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('exibe mensagem de lista vazia quando não há itens', () => {
    gestaoState.load();
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/items');
    req.flush([]);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Ops, ainda não há nenhum item cadastrado.');
  });

  it('exibe linhas na tabela quando há itens', () => {
    const mockItems: IItem[] = [
      { id: 1, name: 'Item Um', description: 'Desc 1', image: 'data:image/png;base64,a', status: ItemStatus.available },
      { id: 2, name: 'Item Dois', description: 'Desc 2', image: 'data:image/png;base64,b', status: ItemStatus.unavailable },
    ];

    gestaoState.load();
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/items');
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
});
