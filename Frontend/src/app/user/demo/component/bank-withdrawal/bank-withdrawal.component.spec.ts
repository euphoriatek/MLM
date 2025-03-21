import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankWithdrawalComponent } from './bank-withdrawal.component';

describe('BankWithdrawalComponent', () => {
  let component: BankWithdrawalComponent;
  let fixture: ComponentFixture<BankWithdrawalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankWithdrawalComponent]
    });
    fixture = TestBed.createComponent(BankWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
