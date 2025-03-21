import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordHistoryComponent } from './change-password-history.component';

describe('ChangePasswordHistoryComponent', () => {
  let component: ChangePasswordHistoryComponent;
  let fixture: ComponentFixture<ChangePasswordHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordHistoryComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
