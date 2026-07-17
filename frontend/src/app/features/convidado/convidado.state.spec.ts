import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
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
});
