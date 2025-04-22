import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNameValidationComponent } from './product-name-validation.component';

describe('ProductNameValidationComponent', () => {
  let component: ProductNameValidationComponent;
  let fixture: ComponentFixture<ProductNameValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductNameValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductNameValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
