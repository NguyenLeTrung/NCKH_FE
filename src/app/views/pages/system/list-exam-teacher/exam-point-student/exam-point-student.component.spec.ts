import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPointStudentComponent } from './exam-point-student.component';

describe('ExamPointStudentComponent', () => {
  let component: ExamPointStudentComponent;
  let fixture: ComponentFixture<ExamPointStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamPointStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPointStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
