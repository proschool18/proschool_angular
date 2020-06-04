import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CTlistmarksComponent } from './ctlistmarks.component';

describe('CTlistmarksComponent', () => {
  let component: CTlistmarksComponent;
  let fixture: ComponentFixture<CTlistmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CTlistmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CTlistmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
