import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';
import { ConfirmacaoCompra } from './confirmacao-compra';
import { ConvidadoState } from '../../convidado.state';

describe('ConfirmacaoCompra', () => {
  let component: ConfirmacaoCompra;
  let fixture: ComponentFixture<ConfirmacaoCompra>;
  let convidadoState: ConvidadoState;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacaoCompra],
      providers: [provideHttpClient(), provideHttpClientTesting(), ConvidadoState],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoCompra);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    convidadoState = TestBed.inject(ConvidadoState);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('altera dialogState para open ao chamar abrirDialog', () => {
    const item: IGuestItem = { id: 1, name: 'Item Teste', image: 'img', status: 'available' };
    convidadoState.abrirDialog(item);
    expect(convidadoState.dialogState()).toBe('open');
    expect(convidadoState.selectedItem()).toEqual(item);
  });

  it('chama fecharDialog ao clicar Não', () => {
    const item: IGuestItem = { id: 1, name: 'Item', image: 'img', status: 'available' };
    convidadoState.abrirDialog(item);
    fixture.detectChanges();

    component.cancelarCompra();

    expect(convidadoState.dialogState()).toBe('closed');
    expect(convidadoState.selectedItem()).toBeNull();
  });

  it('chama confirmarCompra ao clicar Sim e tratando erro', () => {
    const item: IGuestItem = { id: 1, name: 'Item', image: 'img', status: 'available' };
    convidadoState.abrirDialog(item);
    fixture.detectChanges();

    component.confirmarCompra();

    const req = httpMock.expectOne('/api/items/1/marcar-compra');
    req.error(new ProgressEvent('Network error'));

    const reloadReq = httpMock.expectOne('/api/convidado/items');
    reloadReq.flush([]);

    expect(convidadoState.mensagemErro()).toContain('Erro ao marcar compra');
  });
});
