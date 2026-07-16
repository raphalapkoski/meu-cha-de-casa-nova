import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemList } from './item-list';
import { GestaoState } from '../../gestao.state';
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

  it('exibe cards com imagem, nome e botão editar quando há itens', () => {
    const mockItems: IItem[] = [
      { id: 1, name: 'Item Um', image: 'data:image/png;base64,a', status: ItemStatus.available },
      { id: 2, name: 'Item Dois', image: 'data:image/png;base64,b', status: ItemStatus.unavailable },
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

    const buttons = el.querySelectorAll('button');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent).toContain('Editar');
    expect(buttons[1].textContent).toContain('Excluir');
  });

  it('exibe botão Excluir em cada card', () => {
    const mockItems: IItem[] = [
      { id: 1, name: 'Item Um', image: 'data:image/png;base64,a', status: ItemStatus.available },
    ];

    gestaoState.load();
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/items');
    req.flush(mockItems);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const deleteButtons = el.querySelectorAll('button');
    expect(deleteButtons.length).toBe(2);
    expect(deleteButtons[1].textContent).toContain('Excluir');
  });

  it('clique no Excluir chama ItemsService.delete() e recarrega a lista', () => {
    const mockItems: IItem[] = [
      { id: 1, name: 'Item Um', image: 'data:image/png;base64,a', status: ItemStatus.available },
    ];

    gestaoState.load();
    fixture.detectChanges();

    const getReq = httpMock.expectOne('/api/items');
    getReq.flush(mockItems);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const deleteButton = el.querySelectorAll('button')[1];
    deleteButton.click();

    const deleteReq = httpMock.expectOne('/api/items/1');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(null);

    const reloadReq = httpMock.expectOne('/api/items');
    expect(reloadReq.request.method).toBe('GET');
  });
});
