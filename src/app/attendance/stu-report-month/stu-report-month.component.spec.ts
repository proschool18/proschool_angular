import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuReportMonthComponent } from './stu-report-month.component';

describe('StuReportMonthComponent', () => {
  let component: StuReportMonthComponent;
  let fixture: ComponentFixture<StuReportMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuReportMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuReportMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
