import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDownlineListComponent } from './my-downline-list.component';

describe('MyDownlineListComponent', () => {
  let component: MyDownlineListComponent;
  let fixture: ComponentFixture<MyDownlineListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDownlineListComponent]
    });
    fixture = TestBed.createComponent(MyDownlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
