import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptometristLoginComponent } from './optometrist-login.component';

describe('OptometristLoginComponent', () => {
  let component: OptometristLoginComponent;
  let fixture: ComponentFixture<OptometristLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptometristLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptometristLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
