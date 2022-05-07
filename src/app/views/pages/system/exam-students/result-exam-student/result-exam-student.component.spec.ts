import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultExamStudentComponent } from './result-exam-student.component';

describe('ResultExamStudentComponent', () => {
  let component: ResultExamStudentComponent;
  let fixture: ComponentFixture<ResultExamStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultExamStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultExamStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
