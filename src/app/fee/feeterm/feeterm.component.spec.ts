import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeetermComponent } from './feeterm.component';

describe('FeetermComponent', () => {
  let component: FeetermComponent;
  let fixture: ComponentFixture<FeetermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeetermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeetermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
