import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exibe o titulo e nomes do casal', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Chá de casa nova');
    expect(el.textContent).toContain('Ariane e Lucas');
  });

  it('exibe duas imagens de flowers', () => {
    const el = fixture.nativeElement as HTMLElement;
    const imgs = el.querySelectorAll('img');
    expect(imgs.length).toBe(2);
    imgs.forEach((img) => expect(img.getAttribute('src')).toBe('flowers.png'));
  });
});
