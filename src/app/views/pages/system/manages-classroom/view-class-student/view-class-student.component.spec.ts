import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassStudentComponent } from './view-class-student.component';

describe('ViewClassStudentComponent', () => {
  let component: ViewClassStudentComponent;
  let fixture: ComponentFixture<ViewClassStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClassStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
