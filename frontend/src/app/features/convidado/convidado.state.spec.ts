import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';
import { ConvidadoState } from './convidado.state';

describe('ConvidadoState', () => {
  let state: ConvidadoState;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ConvidadoState],
    });

    state = TestBed.inject(ConvidadoState);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('inicia com loading true e items vazio', () => {
    expect(state.loading()).toBe(true);
    expect(state.items()).toEqual([]);
  });

  it('inicia com selectedItem null, dialogState closed, mensagemErro null', () => {
    expect(state.selectedItem()).toBeNull();
    expect(state.dialogState()).toBe('closed');
    expect(state.mensagemErro()).toBeNull();
  });

  it('load define items e loading false após requisição bem-sucedida', () => {
    const mockItems = [
      { id: 1, name: 'Item 1', image: 'img1' },
      { id: 2, name: 'Item 2', image: 'img2' },
    ];

    state.load();

    const req = httpMock.expectOne('/api/convidado/items');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);

    expect(state.loading()).toBe(false);
    expect(state.items()).toEqual(mockItems);
  });

  it('load trata erro e define loading false', () => {
    state.load();

    const req = httpMock.expectOne('/api/convidado/items');
    req.error(new ProgressEvent('Network error'));

    expect(state.loading()).toBe(false);
    expect(state.items()).toEqual([]);
  });

  describe('marcarCompra', () => {
    it('deve recarregar lista do backend após sucesso', () => {
      const mockItems = [
        { id: 1, name: 'Item 1', image: 'img1', status: 'available' },
        { id: 2, name: 'Item 2', image: 'img2', status: 'available' },
      ];

      state.load();
      const loadReq = httpMock.expectOne('/api/convidado/items');
      loadReq.flush(mockItems);

      state.marcarCompra(1).subscribe();

      const patchReq = httpMock.expectOne('/api/items/1/marcar-compra');
      expect(patchReq.request.method).toBe('PATCH');
      patchReq.flush({ id: 1, name: 'Item 1', image: 'img1', status: 'unavailable' });

      const reloadReq = httpMock.expectOne('/api/convidado/items');
      const updatedItems = [
        { id: 1, name: 'Item 1', image: 'img1', status: 'unavailable' },
        { id: 2, name: 'Item 2', image: 'img2', status: 'available' },
      ];
      reloadReq.flush(updatedItems);

      expect(state.items()).toEqual(updatedItems);
      expect(state.marcando()).toBe(false);
    });

    it('deve recarregar lista do backend após erro', () => {
      const mockItems = [
        { id: 1, name: 'Item 1', image: 'img1', status: 'available' },
      ];

      state.load();
      const loadReq = httpMock.expectOne('/api/convidado/items');
      loadReq.flush(mockItems);

      state.marcarCompra(1).subscribe({
        error: () => {},
      });

      const patchReq = httpMock.expectOne('/api/items/1/marcar-compra');
      patchReq.error(new ProgressEvent('Network error'));

      const reloadReq = httpMock.expectOne('/api/convidado/items');
      reloadReq.flush(mockItems);

      expect(state.marcando()).toBe(false);
    });
  });

  describe('abrirDialog / fecharDialog', () => {
    it('abrirDialog define selectedItem e abre o diálogo', () => {
      const item: IGuestItem = { id: 1, name: 'Item', image: 'img', status: 'available' };
      state.abrirDialog(item);
      expect(state.selectedItem()).toEqual(item);
      expect(state.dialogState()).toBe('open');
    });

    it('fecharDialog limpa selectedItem e fecha o diálogo', () => {
      state.abrirDialog({ id: 1, name: 'Item', image: 'img', status: 'available' });
      state.fecharDialog();
      expect(state.selectedItem()).toBeNull();
      expect(state.dialogState()).toBe('closed');
    });
  });

  describe('confirmarCompra', () => {
    it('fecha o diálogo e dispara marcarCompra', () => {
      state.abrirDialog({ id: 1, name: 'Item', image: 'img', status: 'available' });

      state.confirmarCompra().subscribe();
      const patchReq = httpMock.expectOne('/api/items/1/marcar-compra');
      patchReq.flush({});
      const reloadReq = httpMock.expectOne('/api/convidado/items');
      reloadReq.flush([]);

      expect(state.dialogState()).toBe('closed');
      expect(state.selectedItem()).toBeNull();
    });

    it('retorna EMPTY se nenhum item selecionado', () => {
      let emitted = false;
      state.confirmarCompra().subscribe({ next: () => (emitted = true) });
      expect(emitted).toBe(false);
    });
  });

  describe('limparMensagem', () => {
    it('limpa a mensagem de erro', () => {
      state.mensagemErro.set('Erro');
      state.limparMensagem();
      expect(state.mensagemErro()).toBeNull();
    });
  });
});
