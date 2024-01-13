import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTemplateComponent } from './cart-template.component';

describe('CartTemplateComponent', () => {
  let component: CartTemplateComponent;
  let fixture: ComponentFixture<CartTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartTemplateComponent]
    });
    fixture = TestBed.createComponent(CartTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
