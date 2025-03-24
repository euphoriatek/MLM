import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankWithdrawalHistoryComponent } from './bank-withdrawal-history.component';

describe('BankWithdrawalHistoryComponent', () => {
  let component: BankWithdrawalHistoryComponent;
  let fixture: ComponentFixture<BankWithdrawalHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankWithdrawalHistoryComponent]
    });
    fixture = TestBed.createComponent(BankWithdrawalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
