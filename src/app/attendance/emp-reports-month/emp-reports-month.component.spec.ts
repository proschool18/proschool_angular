import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpReportsMonthComponent } from './emp-reports-month.component';

describe('EmpReportsMonthComponent', () => {
  let component: EmpReportsMonthComponent;
  let fixture: ComponentFixture<EmpReportsMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpReportsMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpReportsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
