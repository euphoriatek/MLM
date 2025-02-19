import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKycComponent } from './create-kyc.component';

describe('CreateKycComponent', () => {
  let component: CreateKycComponent;
  let fixture: ComponentFixture<CreateKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateKycComponent]
    });
    fixture = TestBed.createComponent(CreateKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
