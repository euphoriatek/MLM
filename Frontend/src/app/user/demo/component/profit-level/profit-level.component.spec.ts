import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLevelComponent } from './profit-level.component';

describe('ProfitLevelComponent', () => {
  let component: ProfitLevelComponent;
  let fixture: ComponentFixture<ProfitLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitLevelComponent]
    });
    fixture = TestBed.createComponent(ProfitLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
