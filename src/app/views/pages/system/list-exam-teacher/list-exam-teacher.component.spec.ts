import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamTeacherComponent } from './list-exam-teacher.component';

describe('ListExamTeacherComponent', () => {
  let component: ListExamTeacherComponent;
  let fixture: ComponentFixture<ListExamTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExamTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
