import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsListMarksComponent } from './assignments-list-marks.component';

describe('AssignmentsListMarksComponent', () => {
  let component: AssignmentsListMarksComponent;
  let fixture: ComponentFixture<AssignmentsListMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsListMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsListMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
