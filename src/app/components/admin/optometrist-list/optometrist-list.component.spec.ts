import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptometristListComponent } from './optometrist-list.component';

describe('OptometristListComponent', () => {
  let component: OptometristListComponent;
  let fixture: ComponentFixture<OptometristListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptometristListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptometristListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
