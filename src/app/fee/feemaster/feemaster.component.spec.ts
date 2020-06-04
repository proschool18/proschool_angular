import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeemasterComponent } from './feemaster.component';

describe('FeemasterComponent', () => {
  let component: FeemasterComponent;
  let fixture: ComponentFixture<FeemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
