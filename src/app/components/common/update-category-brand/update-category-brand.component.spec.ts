import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryBrandComponent } from './update-category-brand.component';

describe('UpdateCategoryBrandComponent', () => {
  let component: UpdateCategoryBrandComponent;
  let fixture: ComponentFixture<UpdateCategoryBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategoryBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategoryBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
