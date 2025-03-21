import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalListingComponent } from './withdrawal-listing.component';

describe('WithdrawalListingComponent', () => {
  let component: WithdrawalListingComponent;
  let fixture: ComponentFixture<WithdrawalListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawalListingComponent]
    });
    fixture = TestBed.createComponent(WithdrawalListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
