import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentDetailComponent } from './exam-student-detail.component';

describe('ExamStudentDetailComponent', () => {
  let component: ExamStudentDetailComponent;
  let fixture: ComponentFixture<ExamStudentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
