import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasGuardadasComponent } from './cartas-guardadas.component';

describe('CartasGuardadasComponent', () => {
  let component: CartasGuardadasComponent;
  let fixture: ComponentFixture<CartasGuardadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartasGuardadasComponent]
    });
    fixture = TestBed.createComponent(CartasGuardadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
