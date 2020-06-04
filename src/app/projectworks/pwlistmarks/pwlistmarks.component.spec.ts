import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwlistmarksComponent } from './pwlistmarks.component';

describe('PwlistmarksComponent', () => {
  let component: PwlistmarksComponent;
  let fixture: ComponentFixture<PwlistmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwlistmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwlistmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
